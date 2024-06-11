import { useState } from "react";
import Avatar from "react-avatar";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Card } from "primereact/card";
import DetailsContent from "../../components/DetailsContent";
import EditOrganisationForm from "./EditOrganisationForm";
import { Dialog } from "primereact/dialog";

const OrganisationDetail = ({ organisation, onReload }) => {
  const userDetails = [
    { heading: "Registration Number", paragraph: organisation.registrationNumber },
    { heading: "Address", paragraph: organisation.address },
    { heading: "City, Country", paragraph: `${organisation.city}, ${organisation.country}` },
    { heading: "Organisation Size", paragraph: organisation.size },
    { heading: "Average number of students supported annually.", paragraph: organisation.numberOfStudents },
    { heading: "Students Age", paragraph: organisation.studentsAge && organisation.studentsAge === 'Both' ? 'Under 18 and 18+' : organisation.studentsAge  },
  ];
  const [editOrganisationVisible, setEditOrganisationVisible] = useState(false)
  const [formData, setFormData] = useState(organisation)

  return (
    <>
      <Dialog
        header="Edit Organisation"
        visible={editOrganisationVisible}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setEditOrganisationVisible(false)}
      > 
        <div>
          <EditOrganisationForm formData={formData} setFormData={setFormData} setVisible={setEditOrganisationVisible} onReload={onReload}/>
        </div>
      </Dialog>

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
            onClick={() => setEditOrganisationVisible(true)}
          />

        </div>
      </Card>
    </>
  );
};

export default OrganisationDetail;
