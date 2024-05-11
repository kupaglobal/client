import { useContext, useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { MdFullscreenExit, MdFullscreen} from 'react-icons/md'
import { templatesStore } from "../../../store/templates";
import { studentsStore } from "../../../store/students";
import Table from "../../../components/Table/Table";
import { StudentsService } from "../../../services/students.service";
import { toastStore } from "../../../store/toast";

const ErroredStudents = () => {
  const [studentFields, setStudentFields] = useState([]);
  async function fetchStudentFields() {
    try {
      const { data: studentFieldsRes} = await StudentsService.getStudentFields();
      setStudentFields(studentFieldsRes)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : 'Failed to get student fields, please try again.')
    }
  }

  useEffect(() => {
    fetchStudentFields()
  }, [setStudentFields])

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const { state: templatesState } = useContext(templatesStore)
  const { state: studentsState } = useContext(studentsStore)
  const template = templatesState.activeTemplate
  const {erroredStudents, erroredStudentsMessage, reasons} = studentsState
  const { toast } = useContext(toastStore);

  const columns = [{id: 'row', displayName: 'Row', columnName: 'row'}, ...studentFields].map(field => ({
    id: field.columnName,
    name: field.displayName,
    selector: (row) => row[field.columnName],
  }))

  const tableRowItem = "studentFields";

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Typography component="div" fontSize={15}>
          {erroredStudentsMessage}
        </Typography>
      </div>
      <div>
        {isExpanded ? (
            <IconButton
                aria-label="shrink"
                onClick={toggleExpand}
                sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                color: "#fff",
                }}
            >
                <MdFullscreenExit />
            </IconButton>
            ) : (
            <IconButton
                aria-label="expand"
                onClick={toggleExpand}
                sx={{
                float: 'right',
                color: "#000",
                }}
            >
                <MdFullscreen />
            </IconButton>
            )}
            {
              reasons.map(reason => <div><span className="line-height-3 text-red-500 mb-3">{reason}</span></div>)
            }

            <Table columns={columns} data={erroredStudents} tableRowItem={tableRowItem} hideSearch={true}/>
      </div>
    </>
  );
};

export default ErroredStudents;
