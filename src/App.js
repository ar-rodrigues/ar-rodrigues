import React, { useState, useEffect } from "react";
import "./styles.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Navbar from "./Navbar";
import Experiences from "./Experiences";
import Home from "./Home";
import About from "./About";
import Education from "./Education";
import Skills from "./Skills";
import { social } from "./data";

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
      <section className="contact-box">
        <h3>
          Quer saber mais? <br /> Entre em contato comigo!
        </h3>
        <form
          id="contact"
          className="contact-form"
          netlify-honeypot="data-field"
          data-netlify="true"
          onSubmit={(e) => {
            e.preventDefault();
            window.alert("Mensagem Enviada!");
          }}
        >
          <div className="form-itens">
            {/*H O N E Y P O T */}
            <div className="honey">
              <label htmlFor="data"></label>
              <input
                name="data-field"
                autoComplete="off"
                type="text"
                id="data"
              />
            </div>

            <label htmlFor="name" id="name" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              name="name"
              placeholder="digite  aqui seu nome"
              required
            />
          </div>
          <div className="form-itens">
            <label htmlFor="email" id="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="form-input"
              name="email"
              placeholder="email@endereço.com"
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            />
          </div>
          <textarea
            className="comments"
            name="message"
            placeholder="dúvidas, sugestões, conselhos..."
            rows="5"
            cols="50"
            required
          />

          <button className="form-button" type="submit">
            Enviar
          </button>
        </form>
        <ul className="social-contact">
          {social.map((socialIcon) => {
            const { id, url, icon, name } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
                <h4>{name}</h4>
              </li>
            );
          })}
        </ul>
      </section>
      <footer>
        <h4>{"</> Criado por Alisson Rodrigues </>"}</h4>
      </footer>
    </main>
  );
}

export default App;
