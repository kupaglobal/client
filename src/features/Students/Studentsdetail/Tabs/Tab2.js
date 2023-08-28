import React from "react";
import { Avatar } from "primereact/avatar";
import { BsAward, BsTrophyFill } from "react-icons/bs";
import { Divider } from "primereact/divider";
import { BsPlus, BsPencil } from "react-icons/bs";
import { Button } from "primereact/button";

const Tab2 = () => {
  return (
    <>
      <div>
        <Tab2headings Name={'Program Achievements'} />

        <Tab2containers />
        <Tab2containers />

      </div>
      <div>
        <Tab2headings Name={'Other Achievements'} />

        <Tab2containers />
        <Tab2containers />

      </div>
    </>
  );
};

export default Tab2;

export const Tab2containers = () => {
  return (
    <div style={{marginBottom: '2rem'}}>
      <div className="achieve__container">
        <div className="image__container">
          <Avatar
            icon={<BsAward />}
            size="xlarge"
            style={{ backgroundColor: "#087C8F", color: "#fff" }}
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
            Achievement Name
          </p>
          <p style={{ marginBottom: "1rem", fontSize: 13, color: "#cccccc" }}>
            Sept 2022
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit, error.
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
          <p className="bottom-text">Communication</p>
          <p className="bottom-text">Javascript</p>
          <p className="bottom-text">Problem Soving</p>
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
