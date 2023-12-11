import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs";
import Assessmentcontent from "./Assessmentcontent";
// import Studenttabs1 from "./Studenttabs1";
import MeatballMenu from "../../../components/MeatballMenu";
import { useParams } from "react-router-dom";
import { AssessmentsService } from "../../../services/assessments.service";
import { toastStore } from "../../../store/toast";
import AssessmentTabs from "./AssessmentTabs";
import { SET_CURRENT_ASSESSMENT, SET_CURRENT_ASSESSMENT_RESULTS } from "../../../store/actions";
import { assessmentsStore } from "../../../store/assessments";

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

  const [reload, setReload] = useState(true)
  const [reloadResults, setReloadResults] = useState(true)
  const { dispatch, state } = useContext(assessmentsStore)

  useEffect(() => {
    async function fetchAssessment() {
        if (reload) {
            try {
                const {data: assessment} = await AssessmentsService.getAssessmentById(assessmentId)
                Object.keys(assessment).forEach(key => {
                  if (assessment[key] === null) {
                    assessment[key] = 'N/a'
                  }
                })
                setAssessment(assessment)
                setReload(false)
                dispatch({
                    type: SET_CURRENT_ASSESSMENT,
                    payload: assessment
                })
            } catch (e) {
                toast('error', e.response?.data?.message ? e.response.data.message : e.message)
                setReload(false)
            }
        }
    } 
    fetchAssessment()
  }, [assessmentId, toast, reload, reloadResults, dispatch])

  useEffect(() => {
    async function fetchAssessmentResults() {
        if (reloadResults) {
          try {
                const {data} = await AssessmentsService.getAssessmentResultsById(assessmentId, state.selectedFilterOptions)

                setReloadResults(false)
                dispatch({
                  type: SET_CURRENT_ASSESSMENT_RESULTS,
                  payload: data
                })
            } catch (e) {
                toast('error', e.response?.data?.message ? e.response.data.message : e.message)
                setReloadResults(false)
            }
        }
    }
    fetchAssessmentResults()
  }, [assessmentId, toast, reloadResults, dispatch, state.selectedFilterOptions])

  const onReload = () => {
    setReload(true);
    setReloadResults(true)
  }

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
          {assessment ? <Assessmentcontent assessment={assessment} onReload={onReload}  /> : ''}
        </div>
        <div>
          {assessment ? <AssessmentTabs assessment={assessment} onReload={onReload} isLoading={reload} /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Assessmentdet;
