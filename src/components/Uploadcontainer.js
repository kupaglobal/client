import React, { useContext } from "react";
import { FileUpload } from "primereact/fileupload";
import styled from 'styled-components';
import { templatesStore } from "../store/templates";
import { authStore } from "../store/auth";
import { getEnv } from "../utils/env";
import { toastStore } from "../store/toast";
import { RELOAD, SHOW_ADD_STUDENTS_POPUP } from "../store/actions";
import { studentsStore } from "../store/students";

const StyledFileUpload = styled(FileUpload)`
  .p-button {
    font-size: 13px;
    padding: 8px 15px
  }
`;



const Uploadcontainer = () => {
  const { dispatch: studentsDispatch } = useContext(studentsStore)
  const { state: templatesState } = useContext(templatesStore)
  const { toast } = useContext(toastStore)
  const { state: authState } = useContext(authStore)
  const template = templatesState.activeTemplate;

  const uploadUrl = (templateId) => (`${getEnv('BASE_URL','https://sapi.kupaglobal.com')}/templates/${templateId}/upload`)

  const beforeUpload = (event) => {
    event.xhr.open('POST', uploadUrl(template.id));
    event.xhr.setRequestHeader('Authorization', `Bearer ${authState.token}`);
  }
  const onUpload = (event) => {
    toast('success', 'Students uploaded successfully')
    studentsDispatch({
      type: SHOW_ADD_STUDENTS_POPUP,
      payload: false
    })
    studentsDispatch({
      type: RELOAD,
      payload: true
    })
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
        url={uploadUrl(template.id)}
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
          <p className="m-0">Drag and drop the populated template: <b>{template.name}</b> here to upload.</p>
        }
      />
    </div>
  );
};

export default Uploadcontainer;
