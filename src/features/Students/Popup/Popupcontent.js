import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdowncomp from "../../../components/Dropdown";
import Templatetab from "./Templatetab";
import { useState } from "react";
        
export default function Popupcontent() {
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
        label="Submit"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        className="custom-button"

      />
    </div>
  );
  // const [selectedOption, setSelectedOption] = useState("");
  const [projectOptions] = useState([
    { name: "Via template", code: 'VT' },
    { name: "Manual Input",  code: 'MI' },
  ]);

  // const handleOptionSelect = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <>
      <Button
        outlined
        icon={<AiOutlinePlus />}
        label="Add new student"
        className="custom-button"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="New student data"
        visible={visible}
        style={{ width: "60vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >

        <div>
          <p style={{ fontSize: "13px" }}>
            How do you want to add the new data ?
          </p>
          <Dropdowncomp
            projectoption={projectOptions}
          />
        </div>

        <div>
          <Templatetab />
        </div>
      </Dialog>
    </>
  );
}
