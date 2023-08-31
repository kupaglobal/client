import React from "react";
import Breadcrumb from "../../../components/Breadcrumbs";
import Studentcontent from "./Studentcontent";
import Studenttabs1 from "./Studenttabs1";
import MeatballMenu from "../../../components/MeatballMenu";

const Studentdet = () => {
  const breadCrumbs = "Students";
  const breadCrumbsLinkTo = "students";

  const options = [
    { label: "Upload new student data", icon: "pi pi-upload"},
    { label: "Request for feedback", icon: "pi pi-comments" },
  ];
  return (
    <div>
      <Breadcrumb
        name="Student Name"
        firstItem={breadCrumbs}
        linkTo={breadCrumbsLinkTo}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MeatballMenu options={options} />
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <Studentcontent />
        </div>
        <div>
          <Studenttabs1 />
        </div>
      </div>
    </div>
  );
};

export default Studentdet;
