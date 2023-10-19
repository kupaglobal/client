import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import InviteMemberForm from "./InviteMemberForm";
        
export default function AddNewMemberPopupContent() {
  const [visible, setVisible] = useState(false);

  const footerContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Send Invitation"
        icon="pi pi-envelope"
        onClick={() => setVisible(false)}
        className="custom-button"

      />
    </div>
  );

  return (
    <>
      <Button
        outlined
        icon={<AiOutlinePlus />}
        label="Invite New Member"
        className="custom-button"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Invite new member"
        visible={visible}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div>
            <InviteMemberForm/>
        </div>
      </Dialog>
    </>
  );
}
