import React from "react";
import { Avatar } from "primereact/avatar";
import { BsTrophyFill } from "react-icons/bs";
import { Divider } from "primereact/divider";
import { BsPlus, BsPencil } from "react-icons/bs";
import { Button } from "primereact/button";

const Tab2 = () => {
  const programAchievements = [
    {
      name: "Science Fair Winner",
      date: "Sept 2022",
      description: "First Place in the Regional Science Fair for the project ,Renewable Energy Sources.",
      skills: ["Communication", "Javascript", "Problem Solving"],
    },
    {
      name: "Community Service Recognition",
      date: "June 2022",
      description: "Received recognition for her outstanding volunteer work in the local community.",
      skills: ["Volunteering", "Teamwork", "Communication"],
    },
  ];

  const otherAchievements = [
    {
      name: "Youth Leadership Award",
      date: "May 2021",
      description: "Received the Youth Leadership Award for her dedication to community service and leadership skills.",
      skills: ["Leadership", "Public Speaking", "Data Analysis"],
    },
    {
      name: "Environmental Activism Recognition",
      date: "Sept 2020",
      description: "Recognised for her efforts to promote environmental awareness and sustainability",
      skills: ["Microsoft", "Time Management", "Data Analysis"],
    },
  ];

  return (
    <>
      <div>
        <Tab2headings Name={'Program Achievements'} />

        {programAchievements.map((achievement, index) => (
          <Tab2containers key={index} achievement={achievement} />
        ))}
      </div>
      <div>
        <Tab2headings Name={'Other Achievements'} />

        {otherAchievements.map((achievement, index) => (
          <Tab2containers key={index} achievement={achievement} />
        ))}
      </div>
    </>
  );
};

export default Tab2;

export const Tab2containers = ({ achievement }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="achieve__container">
        <div className="image__container">
          <Avatar
            icon={<BsTrophyFill />}
            size="xlarge"
            style={{ backgroundColor: "var(--secondary-color)", color: "#fff" }}
          />
        </div>
        <div>
          <p
            style={{
              color: "#8a92a6",
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 5,
            }}
          >
            {achievement.name}
          </p>
          <p style={{ marginBottom: "1rem", fontSize: 13, color: "#cccccc" }}>
            {achievement.date}
          </p>
          <p>
            {achievement.description}
          </p>
        </div>
      </div>

      <div className="achieve__section-bottom">
        <div>
          {" "}
          <BsTrophyFill size={22} color="#8a92a6" />{" "}
          <span
            style={{ color: "#8a92a6", marginLeft: "5px", fontWeight: 600 }}
          >
            Skills Gained
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {achievement.skills.map((skill, index) => (
            <p key={index} className="bottom-text">{skill}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Tab2headings = ({ Name }) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 15, fontWeight: 800, marginBottom: "8px" }}>
          {Name}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button icon={<BsPlus size={24} />} outlined className="p-button-rounded" />
          <Button  icon={<BsPencil />} outlined className="p-button-rounded" />
        </div>
      </div>
      <Divider />
    </>
  );
};
