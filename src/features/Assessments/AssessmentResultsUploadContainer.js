import React, { useContext } from "react";
import { FileUpload } from "primereact/fileupload";
import styled from 'styled-components';
import { authStore } from "../../store/auth";
import { getEnv } from "../../utils/env";
import { toastStore } from "../../store/toast";

const StyledFileUpload = styled(FileUpload)`
  .p-button {
    font-size: 13px;
    padding: 8px 15px
  }
`;

const AssessmentResultsUploadContainer = ({ assessment, hide }) => {
  const { toast } = useContext(toastStore)
  const { state: authState } = useContext(authStore)

  const uploadUrl = (assessmentId) => (`${getEnv('BASE_URL','https://sapi.kupaglobal.com')}/assessment-results/${assessmentId}`)

  const beforeUpload = (event) => {
    event.xhr.open('POST', uploadUrl(assessment.id));
    event.xhr.setRequestHeader('Authorization', `Bearer ${authState.token}`);
  }

  const onUpload = (event) => {
    let toastMessage = "";
    let toastType = "success"
    const res = event.xhr;
    const response = JSON.parse(res.response) ?? null;
    const { created, errored: erroredResults } = response;

    if (response && response.errored && response.errored.length === 0) {
      toastMessage = 'Student Results uploaded successfully';
      // studentsDispatch({
      //   type: RELOAD,
      //   payload: true
      // })
    } else if (response && response.errored && response.errored.length > 0) {
      if (created.length > 0) {
        toastType = "warning"
        toastMessage = `${created.length} ${created.length !== 1 ? 'Students were created' : 'Student was created'}. However ${erroredResults.length} ${erroredResults.length !== 1 ? 'were not' : 'was not'} saved due to validation issues.`
      } else {
        toastType = "error"
        toastMessage = `${erroredResults.length} Student Result(s) were not saved due to validation issues.`
      }
    }

    toast(toastType, toastMessage)
    hide()
    // studentsDispatch({
    //   type: SHOW_ADD_STUDENTS_POPUP,
    //   payload: false
    // })

    // studentsDispatch({
    //   type: RELOAD,
    //   payload: true
    // })

    // studentsDispatch({
    //   type: SHOW_ERRORED_STUDENTS_POPUP,
    //   payload: {
    //     erroredStudents: erroredResults,
    //     message: toastMessage
    //   }
    // })
  }

  const handleError = (error) => {
    let toastMessage = 'Something went wrong, please try uploading.';
    if (error.xhr) {
      const responseError = JSON.parse(error.xhr.responseText) || null
      if (responseError && responseError.error) {
        toastMessage = responseError.error
      }
    }
    if (toastMessage) {
      toast('error', toastMessage)
    }
  }
  return (
    <div >
      <StyledFileUpload
        name="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
        maxFileSize={1000000}
        onBeforeSend={beforeUpload}
        url={uploadUrl(assessment.id)}
        onError={handleError}
        onUpload={onUpload}
        pt={{
          badge: {
            root: {
              style: {
                display: 'none'
              }
            }
          }
        }}
        emptyTemplate={
          <p className="m-0">Drag and drop the populated template for <b>{assessment.name}</b> here to upload.</p>
        }
      />
    </div>
  );
};

export default AssessmentResultsUploadContainer;
