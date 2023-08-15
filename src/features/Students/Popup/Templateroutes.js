import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Verticalcard from "../../../components/Cards/Verticalcard";
import Templateroute1 from "./Templateroute1";
import { styled } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Uploadcontainer from "../../../components/Uploadcontainer";

const tabs = ["Step 1", "Step 2", "Step 3"];

const CustomTypo = styled(Typography)(({ theme }) => ({
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#25245D",
    fontWeight: "600",
  },
}));

function BreadcrumbNav({ activeStep, handleStepClick }) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ paddingBottom: 2 }}
    >
      {tabs.map((tab, index) => (
        <CustomTypo
          key={index}
          color={activeStep === index ? "#25245D" : "textSecondary"}
          onClick={() => handleStepClick(index)}
          sx={{ fontSize: "12px", cursor: "pointer" }}
        >
          {tab}
        </CustomTypo>
      ))}
    </Breadcrumbs>
  );
}

function Templateroutes() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  let contentComponent;
  switch (activeStep) {
    case 0:
      contentComponent = <Verticalcard />;
      break;
    case 1:
      contentComponent = <Templateroute1 />;
      break;
       case 2:
      contentComponent = <Uploadcontainer />;
      break;
    default:
      contentComponent = <div>No content available.</div>;
  }

  return (
    <>
      <BreadcrumbNav
        activeStep={activeStep}
        handleStepClick={handleStepClick}
      />
      {contentComponent}
    </>
  );
}

export default Templateroutes;
