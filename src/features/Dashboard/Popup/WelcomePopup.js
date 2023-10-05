import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
        
export default function WelcomePopup({ user }) {
    const [queryParams] = useSearchParams()
    const isNewUser = queryParams.get('welcome')!=undefined || false

    const [visible, setVisible] = useState(isNewUser);
    const goTo = useNavigate()

    const goToCreateOrganisationPage = () => {
      setVisible(false)
      goTo('/organisation?new')
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
            icon="pi pi-check"
            onClick={() => goToCreateOrganisationPage()}
            className="custom-button"
        />
        </div>
    );

  return (

      <Dialog
        header="Create your organisation"
        visible={visible}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => goToCreateOrganisationPage()}
        footer={footerContent}
      > 
        <div>
          Welcome to Kupa Global { user }. Before you start adding data, you need to create an organisation. This is how all your Cohorts, Groups and Students will be grouped. You will also be able to add other team members to this organisation.
        </div>
      </Dialog>
  );
}
