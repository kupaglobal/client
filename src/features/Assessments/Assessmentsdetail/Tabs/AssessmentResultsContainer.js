import React, { useContext } from "react";
import { assessmentsStore } from "../../../../store/assessments";
import Table from "../../../../components/Table/Table";

const AssessmentDashboard = () => {
  const { state } = useContext(assessmentsStore)
  const assessment = state.currentAssessment

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
      id: "result_student_gender",
      name: "Gender",
      selector: (row) => row.student.gender,
      sortable: true,
    },
  ];
  const tableRowItem = "students";
  
  const results = assessment.results.filter(assessment => assessment.student).map(result => ({ ...result, id: result.student.id }))
  return (
    <div>
        {/* <Table columns={columns} data={results} tableRowItem={tableRowItem} popupContent={<FilterOptions resource="assessment" />} /> */}
        <Table columns={columns} data={results} tableRowItem={tableRowItem} />
    </div>
  );
};

export default AssessmentDashboard;
