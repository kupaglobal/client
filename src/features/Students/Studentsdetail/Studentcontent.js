import React from "react";
import Avatar from "react-avatar";
import { Button } from "primereact/button"; // Import PrimeReact Button
import styled from "styled-components";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from 'primereact/accordion';

const StyledIconButton = styled(Button)`
position: absolute,
top: 0,
right: 0,
`;

const Studentcontent = () => {
  return (
    <>
      <Card style={{ width: "300px" }}>
        <div
          className="parts__image"
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            name="BD"
            size="100"
            textSizeRatio={1.75}
            round={true}
            color="#087C8F"
          />
            <StyledIconButton
              icon="pi pi-envelope"
              aria-label="Message"
              outlined
              text
              style={{alignSelf: 'flex-start'}}
            />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: "8px" }}>
              Bisola Davis
            </p>
          
          <p style={{ color: "#8a92a6", fontWeight: 500, fontSize: 13,paddingBottom: 10 }}>
            Course Enrollment: Mathematics 101
          </p>
          <p style={{ color: "#8a92a6", fontWeight: 500, fontSize: 13 }}>
            Class : Cohort 3
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            label="Edit Profile"
            icon="pi pi-user-edit"
            className="p-button-outlined p-button-sm"
          />

          <Button
            label="Share"
            icon="pi pi-share-alt"
            className="p-button-outlined p-button-sm"
          />
        </div>
      </Card>
    </>
  );
};

export default Studentcontent;
