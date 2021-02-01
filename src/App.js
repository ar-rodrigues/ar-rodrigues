import React, { useState, useEffect } from "react";
import "./styles.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Navbar from "./Navbar";
import Experiences from "./Experiences";
import Home from "./Home";
import About from "./About";
import Education from "./Education";
import Skills from "./Skills";

function App() {
  const [activeSection, setActiveSection] = useState([
    <Experiences />,
    <Education />,
    <Skills />
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = activeSection.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, activeSection]);
  return (
    <main>
      <Navbar setIndex={setIndex} />
      <Home />
      <About />
      <div id="experiences" className="experiences">
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <AiOutlineLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <AiOutlineRight />
        </button>
        {activeSection[index]}
      </div>
    </main>
  );
}

export default App;
