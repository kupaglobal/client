import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs";
import Assessmentcontent from "./Assessmentcontent";
// import Studenttabs1 from "./Studenttabs1";
import MeatballMenu from "../../../components/MeatballMenu";
import { useParams } from "react-router-dom";
import { AssessmentsService } from "../../../services/assessments.service";
import { toastStore } from "../../../store/toast";
import AssessmentTabs from "./AssessmentTabs";

const Assessmentdet = () => {
  const breadCrumbs = "Assessments";
  const breadCrumbsLinkTo = "assessments";
  const [assessment, setAssessment] = useState(null)
  const assessmentId = useParams().id
  const {toast} = useContext(toastStore)

  const options = [
    { label: "Download Assessment Results Template", icon: "pi pi-download"},
    { label: "Request for feedback", icon: "pi pi-comments" },
  ];

  useEffect(() => {
    async function fetchAssessment() {
        try {
            const {data: assessment} = await AssessmentsService.getAssessmentById(assessmentId)
            Object.keys(assessment).forEach(key => {
              if (assessment[key] === null) {
                assessment[key] = 'N/a'
              }
            })
            setAssessment(assessment)
        } catch (e) {
            toast('error', e.response?.data?.message ? e.response.data.message : e.message)
        }
    } 
    fetchAssessment()
  }, [assessmentId, toast])

  return (
    <div>
      <Breadcrumb
        name={assessment && assessment.name ? assessment.name : ''}
        firstItem={breadCrumbs}
        linkTo={breadCrumbsLinkTo}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MeatballMenu options={options} />
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          {assessment ? <Assessmentcontent assessment={assessment} /> : ''}
        </div>
        <div>
          {assessment ? <AssessmentTabs assessment={assessment} /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Assessmentdet;
