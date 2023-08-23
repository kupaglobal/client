import * as React from "react";
import { Button } from "primereact/button";
import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogContentText,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdown from "../../../components/Dropdown";
import Templatetab from "./Templatetab";

export default function Popupcontent() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [projectOptions, setProjectOptions] = React.useState([
    { id: 1, name: "Via template" },
    { id: 2, name: "Manual Input" },
  ]);
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderCloseButton = (onClose) => (
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <MdClose />
    </IconButton>
  );

  return (
    <>
      <Button
        onClick={handleClickOpen("paper")}
        outlined
        icon= {<AiOutlinePlus />}
        label="Add new student"
       className="custom-button"
      />
   

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="dialog-title" fontSize={16}>
          {renderCloseButton(handleClose)}
          New student data
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div>
            <DialogContentText fontSize={13}>
              How do you want to add the new data ?
            </DialogContentText>
        <Dropdown  labelname={'Select Option'} projectoption={projectOptions} selectedOption={selectedOption} handleOptionSelect={handleOptionSelect}/>
          </div>

<div>
  <Templatetab/>
</div>

        </DialogContent>
        <DialogActions>
        <Button
        label="Cancel"
        className="custom-button"
        onClick={handleClose}
      />
       <Button
        label="Next"
        outlined
        className="custom-button"
        onClick={handleClose}

      />
        </DialogActions>
      </Dialog>
    </>
  );
}
