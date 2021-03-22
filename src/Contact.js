import React, { useState } from "react";
import "./styles.css";
import { social } from "./data";

const idGen = () => {
  return new Date().getTime().toString();
};
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

function Contact() {
  const [fields, setFields] = useState({
    id: "",
    data: "",
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;
    setFields({ ...fields, id: idGen(), [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFields(fields);
    setFields({
      id: "",
      data: "",
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section className="contact-box">
      <h3>
        Quer saber mais? <br /> Entre em contato comigo!
      </h3>
      <form
        action="/contact"
        id="contact"
        name="contact"
        method="POST"
        className="contact-form"
        netlify-honeypot="bot-field"
        onSubmit={(e) => handleSubmit(e)}
        data-netlify="true"
      >
        <div className="form-itens">
          {/*H O N E Y P O T */}
          <div className="honey">
            <label htmlFor="bot-field"></label>
            <input
              name="bot-field"
              autoComplete="off"
              type="text"
              id="bot-field"
              value={fields.data}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input type="hidden" name="form-name" value="contact" />
          <label htmlFor="name" id="name" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            value={fields.name}
            onChange={(e) => handleChange(e)}
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
            value={fields.email}
            onChange={(e) => handleChange(e)}
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
          id="message"
          value={fields.message}
          onChange={(e) => handleChange(e)}
          placeholder="dúvidas, sugestões, conselhos..."
          rows="5"
          cols="50"
          required
        />

        <button
          className="form-button"
          type="submit"
          onSubmit={(e) => handleSubmit(e)}
        >
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
  );
}

export default Contact;
