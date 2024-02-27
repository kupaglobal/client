import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
        
export default function WelcomePopup({ user }) {
  console.log(user)
    const [queryParams] = useSearchParams()
    const isNewOrgAdmin = user.role === 'ORGANISATION_ADMIN' && (queryParams.get('welcome') !== undefined && queryParams.get('welcome') !== null) || false
    const isNewFacilitator = user.role === 'FACILITATOR' && (queryParams.get('welcome') !== undefined && queryParams.get('welcome') !== null) || false

    const [visible, setVisible] = useState(isNewOrgAdmin);
    const [visibleFacilitator, setVisibleFacilitator] = useState(isNewFacilitator);

    const goTo = useNavigate()

    const goToCreateOrganisationPage = () => {
      setVisible(false)
      goTo('/organisation?new')
    }

    const goToStudentsPage = () => {
      setVisible(false)
      goTo('/students')
    }

    const footerContent = (

      <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      {/* <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => setVisible(false)}
          className="custom-button"
          outlined
      /> */}
      <Button
          label="Create Organisation"
          icon="pi pi-plus"
          onClick={() => goToCreateOrganisationPage()}
          className="custom-button"
      />
      </div>
  );

  const facilitatorFooterContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
    {/* <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="custom-button"
        outlined
    /> */}
    <Button
        label="View Students"
        icon="pi pi-users"
        onClick={() => goToStudentsPage()}
        className="custom-button"
    />
    </div>
);

  return (
    <>
    <Dialog
      header="Create your organisation"
      visible={visible}
      style={{ width: "30vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={() => goToCreateOrganisationPage()}
      footer={footerContent}
      > 
      <div>
        Welcome to Kupa Global{ user?.firstName ? `, ${user.firstName}` : "" }! Before you start adding data, you need to create an organisation. This is how all your Cohorts, Groups and Students will be grouped. You will also be able to add other team members to this organisation.
      </div>
    </Dialog>
    <Dialog
      header="Welcome"
      visible={isNewFacilitator}
      style={{ width: "30vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={() => goToStudentsPage()}
      footer={facilitatorFooterContent}
      > 
      <div>
        Welcome to Kupa Global{ user?.firstName ? `, ${user.firstName}` : "" }! You have now joined { user.organisation.name}. You will soon be added to cohorts of students where you will be able to add feedback for the students on the assessments they took.
      </div>
    </Dialog>

   </>
);
}
