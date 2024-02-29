import React, { useContext, useEffect, useState } from "react";
import { Tab2headings } from "./Tab2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { AssessmentsService } from "../../../../services/assessments.service";
import { toastStore } from "../../../../store/toast";
import EditAssessmentResultForm from "../../../Assessments/Popup/EditAssessmentResultForm";
import { Dialog } from "primereact/dialog";
import { authStore } from "../../../../store/auth";
const Tab3 = ({ student }) => {
  const {toast} = useContext(toastStore)
  const {state: authState} = useContext(authStore)
  
  const handleRowClick = ({data: row }) => {
    setShowEditAssessmentResultsForm(true)
    setSelectedAssessmentResult(row)
  };

  const [selectedAssessmentResult, setSelectedAssessmentResult] = useState(null)
  const [showEditAssessmentResultsForm, setShowEditAssessmentResultsForm] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState([])
  const [refetchAssessments, setRefetchAssessments] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getStudentAssessmentResults() {
      try {
        const { data: { results } } = await AssessmentsService.getAssessmentResultsByStudentId(student.id)
        setAssessmentResults(results.map(result => {
          if (!result.grade) {
            result.grade = '--'
          }
          if (!result.score) {
            result.score = '--'
          }
          return result
        })) 
        setRefetchAssessments(false)
      } catch (e) {
        toast('error', 'Failed to get student assessment results, please try again.')
        setRefetchAssessments(false)
      }
    }
    if (refetchAssessments) {
      getStudentAssessmentResults()
    }
  }, [refetchAssessments, setAssessmentResults, student, toast])

  const updateAssessmentResult = async (assessmentResultDto) => {
    try {
      setIsLoading(true)
      if (authState.loggedInUser.role === 'FACILITATOR') {
        await AssessmentsService.saveFeedback(selectedAssessmentResult.id, assessmentResultDto.feedback)
      } else {
        await AssessmentsService.editAssessmentResult(selectedAssessmentResult.id, assessmentResultDto)
      }
      setRefetchAssessments(true)
      toast('success', 'Assessment result has been updated.')
      setIsLoading(false)
      setShowEditAssessmentResultsForm(false)
    } catch (e) {
      console.error(e)
      toast('error', 'Failed to update assessment result. Please try again')
      setIsLoading(false)
    }

  }

  const createColumns = (type) => {
    const commonColumns = [
      // { field: "Level", header: "Level" },
      // { field: "Subject", header: "Subject" },
      { field: "score", header: "Score (%)", sortable: true },
      { field: "grade", header: "Grade", sortable: true },
      { field: "feedback", header: "Feedback" },
      { field: "dateConducted", header: "Date", sortable: true },
    ];

    const specificColumns = type === "Student Scores"
      ? [{ field: "assessment.name", header: "Assessment" }]
      : [{ field: "Institution", header: "Institution" }];

    return [...specificColumns, ...commonColumns];
  };

  const initialProductsStudentScores = [
    {
      Assessment: "Math101",
      Level: "Grade 2",
      Subject: "Mathematics",
      Score: 10,
      Grade: "A1 Distinction",
      Date: "1/2/2023",
    },
    {
      Assessment: "Eng101",
      Level: "Grade 2",
      Subject: "English",
      Score: 10,
      Grade: "A1 Distinction",
      Date: "1/2/2023",
    },
  ];
  
  const [globalFilter, setGlobalFilter] = useState("");

  const onInputChange = (event) => {
    setGlobalFilter(event.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="text"
            value={globalFilter}
            onChange={onInputChange}
            placeholder="Keyword Search"
            style={{ fontSize: "12px" }}
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Tab2headings Name={"Student Scores"} />
        <div className="card">
          <DataTable
            value={assessmentResults}
            removableSort
            paginator
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
            globalFilter={globalFilter}
            header={header}
            emptyMessage="No data found."
            selectionMode="single"
            scrollable
            onRowClick={handleRowClick}
          >
            {createColumns("Student Scores", initialProductsStudentScores).map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable={col.sortable}
                style={{ fontSize: "12px" }}
              />
            ))}
          </DataTable>
        </div>
      </div>
      <Dialog
          header={`Edit Assessment Results`}
          style={{ width: "30vw" }}
          visible={showEditAssessmentResultsForm}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          onHide={() => setShowEditAssessmentResultsForm(false) && setSelectedAssessmentResult(null)}
        > 
          <div> 
            <EditAssessmentResultForm
              formData={selectedAssessmentResult}
              setFormData={setSelectedAssessmentResult}
              updateAssessmentResult={updateAssessmentResult}
              isLoading={isLoading}
              user={authState.loggedInUser}
            />
          </div>
        </Dialog>

    </>
  );
};

export default Tab3;
