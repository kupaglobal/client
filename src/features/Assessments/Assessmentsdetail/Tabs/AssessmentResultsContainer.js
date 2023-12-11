import React, { useContext } from "react";
import { assessmentsStore } from "../../../../store/assessments";
import Table from "../../../../components/Table/Table";
import { SET_ASSESSMENT_FILTER_OPTIONS } from "../../../../store/actions";
import { cleanedDateStr } from "../../../../utils/moment";

const AssessmentResultsContainer = ({ onFilter, isLoading }) => {
  const { state, dispatch } = useContext(assessmentsStore)
  const assessment = state.currentAssessment
  const {results: assessmentResults, filterOptions} = state.currentAssessmentResults

  const columns = [
    {
      id: "result_id",
      name: "ID.",
      selector: (row) => row.avatar,
      sortable: true,
    },
    {
      id: "result_student_name",
      name: "Student Name",
      selector: (row) => `${row.student.firstName} ${row.student.lastName}`,
      sortable: true,
    },
    (assessment.type === 'score') ? {
      id: "result_score",
      name: "Score",
      selector: (row) => row.score,
      sortable: true,
    } : {
        id: "result_grade",
        name: "Grade",
        selector: (row) => 'dd',
        sortable: true,
    },
    {
        id: "result_dateConducted",
        name: "Gender",
        selector: (row) => cleanedDateStr(row.dateConducted),
        sortable: true,
    },
    {
      id: "result_student_gender",
      name: "Gender",
      selector: (row) => row.student.gender,
      sortable: true,
    },
  ];
  const tableRowItem = "students";
  
  const results = assessmentResults.filter(assessment => assessment.student).map(result => ({ ...result, id: result.student.id }))

  const handleOnFilter = (selectedFilterOptions) => {
    dispatch({
        type: SET_ASSESSMENT_FILTER_OPTIONS,
        payload: selectedFilterOptions
    })
    onFilter(selectedFilterOptions)
  }
  return (
    <>
        {/* <Table columns={columns} data={results} tableRowItem={tableRowItem} popupContent={<FilterOptions resource="assessment" />} /> */}
        <Table columns={columns} data={results} tableRowItem={tableRowItem} filterOptions={filterOptions} hideSearch={true} onFilter={handleOnFilter} isLoading={isLoading} />
    </>
  );
};

export default AssessmentResultsContainer;
