import React from "react";
import { social, infos } from "./data";

function About() {
  return (
    <section 
    id='about'
    className="about">
      <article className="contact-box">
        <ul className="social-contact">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </article>

      {infos.map((infoItem) => {
        const { id, name, birth, about, photo } = infoItem;
        const getAge = (dateString) => {
          let today = new Date();
          let birthDate = new Date(dateString);
          let age = today.getFullYear() - birthDate.getFullYear();
          let m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        };

        return (
          <article key={id} className="info-about">
            <img src={photo} alt="alisson rodrigues" />
            <div className="info-text">
              <h3>{`${name}, ${getAge(birth)} anos`}</h3>
              <h4>Sobre</h4>
              <p>{about}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default About;
