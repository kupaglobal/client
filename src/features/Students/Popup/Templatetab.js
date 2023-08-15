import * as React from "react";
import { a11yProps } from "../Studentcontainer";
import { CustomTabPanel } from "../Studentcontainer";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";
import Templateroutes from "./Templateroutes";

const CustomTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  textTransform: "initial",
  fontWeight: 400,
}));

const Templatetab = () => {
  const [value, setValue] = React.useState(0);
  const [showComponent, setShowComponent] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleButtonClick = () => {

  };

  return (
    <>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} textColor="primary">
            <CustomTab label="Existing template" {...a11yProps(0)} />
            <CustomTab label="Create template" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Templateroutes/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <p>Create template</p>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Templatetab;
