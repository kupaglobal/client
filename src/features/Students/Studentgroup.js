import React from "react";
import Horiontalcard from "../../components/Cards/Horiontalcard";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";

const Studentgroup = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="custom-button"
          icon={<AiOutlinePlus />}
          label="Group"
          outlined
        />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Horiontalcard />
        <Horiontalcard />
        <Horiontalcard />
        <Horiontalcard />
      </div>
    </div>
  );
};

export default Studentgroup;
