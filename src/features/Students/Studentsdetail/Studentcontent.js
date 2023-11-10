import React from "react";
import Avatar from "react-avatar";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Card } from "primereact/card";
import DetailsContent from "../../../components/DetailsContent";
import { BiLogoWhatsapp } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Link } from "react-router-dom";

const Studentcontent = ({ student }) => {
  const handleClickOpen = () => {};
  const categories = [
    { name: "Review assessment", key: "RA" },
    { name: "Submit portfolio files", key: "SPF" },
    { name: "Request for feedback", key: "RCE" },
  ];

  const [selectedCategories] = useState([categories[1]]);
  const userDetails = [
    { heading: "Date of Birth", paragraph: student.dob },
    { heading: "Gender", paragraph: student.gender },
    { heading: "Cohort", paragraph: "N/A" },
    { heading: "City, Country", paragraph: `${student.city} ${student.country}` },
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
            name="BD"
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
              {student.firstName} {student.lastName}
            </p>

            {student.phone && student.phone!=='N/a' ? 
              <Link 
                to={`https://wa.me/${student.phone}?text=HI%20${student.firstName},%20`}
                target="_blank"
              >
                <Button
                  icon={<BiLogoWhatsapp size={22} />}
                  aria-label="Message"
                  text
                  style={{ alignItems: "flex-start", padding: 0 }}
                />
              </Link> 
              : ''}
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

        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 500 }}>Outstanding Items</p>
            <div>
              <Button
                onClick={handleClickOpen()}
                icon={<AiOutlinePlus size={22} />}
                text
                style={{ alignItems: "flex-start", padding: 0 }}
              />
              <Button
                onClick={handleClickOpen()}
                icon={<AiOutlineEdit size={22} />}
                text
                style={{ alignItems: "flex-start", padding: 0 }}
              />
            </div>
          </div>
          <div style={{ marginLeft: 15 }}>
            {categories.map((category) => {
              return (
                <div key={category.key} style={{ marginBottom: 15 }}>
                  <Checkbox
                    inputId={category.key}
                    name="category"
                    value={category}
                    checked={selectedCategories.some(
                      (item) => item.key === category.key
                    )}
                    style={{ marginRight: 10 }}
                  />
                  <label htmlFor={category.key} style={{ fontSize: 13 }}>
                    {category.name}
                  </label>
                </div>
              );
            })}
          </div>
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
