import React, { useState } from "react";
import { BreadCrumb } from 'primereact/breadcrumb';
import Templateroute1 from "./Templateroute1";
import Uploadcontainer from "../../../components/Uploadcontainer";

const createTemplateTabs = [
  { label: "Select Fields" },
  { label: "Preview" },
  { label: "Upload" },
];

const savedTemplateTabs = [
  { label: "Select Template" },
  { label: "Preview" },
  { label: "Upload" },
];

export function BreadcrumbNav({ activeStep, handleStepClick, tabs }) {
  return (
    <BreadCrumb
      model={tabs.map((tab, index) => ({
        label: tab.label,
        url: null,
        styleClass: activeStep === index ? "active font-bold my-breadcrumb" : "my-breadcrumb",
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

function Templateroutes({ case1card: Case1Card, section }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState(null)
  const [tabs] = useState(!section || section==='Create Template' ? createTemplateTabs : savedTemplateTabs)

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  let contentComponent;
  switch (activeStep) {
    case 0:
      contentComponent = <Case1Card setActiveStep={setActiveStep} setActiveTemplate={setActiveTemplate}/>
      break;
    case 1:
      contentComponent = <Templateroute1 template={activeTemplate} setActiveStep={setActiveStep} />;
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
        tabs={tabs}
        activeStep={activeStep}
        handleStepClick={handleStepClick}
      />
      {contentComponent}
    </>
  );
}

export default Templateroutes;
