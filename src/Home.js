import React from "react";

function Home() {
  const imageBgOne = "/grey-2661270.png";
  const imageBgTwo = "/back-to-work.jpg";
  return (
    <header 
    id="home" 
    className="header"
    style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(${imageBgOne}), url(${imageBgTwo})`}}
    >
      <div className="header-box">
        <h3>Alisson Rodrigues</h3>
        <h4>Estudante de Ciências Sociais (UFRGS)</h4>
      </div>
    </header>
  );
}

export default Home;
