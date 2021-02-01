import React, { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { courses } from "./data";

function Education() {
  const [value, setValue] = useState(0);

  const { title, field, institution, dates, names, certified } = courses[value];

  return (
    <section>
      <div className="title">
        <h2>Cursos</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {courses.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.field}
              </button>
            );
          })}
        </div>
        {/* courses info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{field}</h4>
          <h5>{institution}</h5>
          <p className="job-date">{dates}</p>
          {names.map((name, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>
                  <a href={certified[index]} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Education;
