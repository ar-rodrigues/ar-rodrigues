import React from "react";
import {
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Radar,
  PolarGrid
} from "recharts";
import { skills } from "./data";

function Skills() {
  return (
    <section className="skill-section">
      <div className="title">
        <h2>Hablidades</h2>
      </div>
      <div>
        <article className="skill-center">
          <div>
            {
              //chart
            }
            <RadarChart
              cx="50%"
              innerRadius="10%"
              outerRadius="70%"
              width={350}
              height={400}
              margin={{ top: 0, right: 0, bottom: 5, left: 0 }}
              data={skills}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={78} domain={[0, 7]} />
              <Radar
                name="Habilidades"
                dataKey="nivel"
                stroke="#2884d8"
                fill="#2884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Skills;
