import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

export default function Popupcontent() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
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
        variant="outlined"
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        startIcon={<AiOutlinePlus />}
        sx={{
          fontSize: "12px",
          textTransform: "initial",
          borderColor: "var(--secondary-color)",
          color: "var(--secondary-color)",
        }}
      >
        Add new student
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title" fontSize={14}>
          {renderCloseButton(handleClose)} 

          New student data
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
