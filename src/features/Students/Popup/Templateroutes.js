import React, { useState } from "react";
import { BreadCrumb } from 'primereact/breadcrumb';
import Templateroute1 from "./Templateroute1";
import Uploadcontainer from "../../../components/Uploadcontainer";


const tabs = [
  { label: "Select Fields" },
  { label: "Preview" },
  { label: "Upload" },
];

export function BreadcrumbNav({ activeStep, handleStepClick }) {
  return (
    <BreadCrumb
      model={tabs.map((tab, index) => ({
        label: tab.label,
        url: null,
        styleClass: activeStep === index ? "active  my-breadcrumb" : "my-breadcrumb",
        command: () => handleStepClick(index),
      }))}
      home={{
        icon: "pi pi-home",
        url: null,
        styleClass: "first-breadcrumb",
      }}
    />
  );
}

function Templateroutes({ case1card: Case1Card }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  let contentComponent;
  switch (activeStep) {
    case 0:
      contentComponent = <Case1Card />;
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
