import React from "react";
import Avatar from "react-avatar";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Card } from "primereact/card";
import DetailsContent from "../../components/DetailsContent";

const Studentcontent = ({ organisation }) => {
  const userDetails = [
    { heading: "Registration Number", paragraph: organisation.registrationNumber },
    { heading: "Address", paragraph: organisation.address },
    { heading: "City, Country", paragraph: `${organisation.city}, ${organisation.country}` },
    { heading: "Organisation Size", paragraph: organisation.size },
    { heading: "Number of Students", paragraph: organisation.numberOfStudents },
    { heading: "Students Age", paragraph: organisation.studentsAge },
  ];
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
            name={organisation.name}
            size="100"
            textSizeRatio={1.75}
            round={true}
            color="var(--primary-color)"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: "8px" }}>
              {organisation.name}
            </p>
          </div>
          <div>
            {userDetails.map((detail, index) => (
              <DetailsContent
                key={index}
                heading={detail.heading}
                paragraph={detail.paragraph}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            label="Edit Organisation"
            icon="pi pi-building"
            className="p-button-outlined p-button-sm"
          />

        </div>
      </Card>
    </>
  );
};

export default Studentcontent;
