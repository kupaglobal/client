import React from "react";
import Horiontalcard from "../../components/Cards/Horiontalcard";
import { Button } from "@mui/material";
const Studentgroup = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            marginRight: "20px",
            fontSize: "12px",
            textTransform: "initial",
            backgroundColor: "var(--secondary-color)",
          }}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "12px",
            textTransform: "initial",
            borderColor: "var(--secondary-color)",
            color: "var(--secondary-color)",
          }}
        >
          Add new student
        </Button>
      </div>
      <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Horiontalcard />
        <Horiontalcard />
        <Horiontalcard />
        <Horiontalcard />
      </div>
    </div>
  );
};

export default Studentgroup;
