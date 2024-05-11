import React, { useContext, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import styled from 'styled-components';
import { templatesStore } from "../store/templates";
import { authStore } from "../store/auth";
import { getEnv } from "../utils/env";
import { toastStore } from "../store/toast";
import { RELOAD, SHOW_ADD_STUDENTS_POPUP, SHOW_ERRORED_STUDENTS_POPUP } from "../store/actions";
import { studentsStore } from "../store/students";
import { Button } from "primereact/button";
import { TemplatesService } from "../services/templates.service";

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
  const [isLoading, setIsLoading] = useState(false)

  const uploadUrl = () => (`${getEnv('BASE_URL','https://sapi.kupaglobal.com')}/templates/upload`)

  const beforeUpload = (event) => {
    event.xhr.open('POST', uploadUrl(template.id));
    event.xhr.setRequestHeader('Authorization', `Bearer ${authState.getToken()}`);
  }
  const onUpload = (event) => {
    let toastMessage = "";
    let toastType = "success"
    const res = event.xhr;
    const response = JSON.parse(res.response);
    const { created, errored: erroredStudents, reasons } = response;

    if (response && response.errored && response.errored.length === 0) {
      toastMessage = 'Students uploaded successfully';
      studentsDispatch({
        type: RELOAD,
        payload: true
      })
    } else if (response && response.errored && response.errored.length > 0) {
      if (created.length > 0) {
        toastType = "warning"
        toastMessage = `${created.length} ${created.length !== 1 ? 'Students were created' : 'Student was created'}. However ${erroredStudents.length} ${erroredStudents.length !== 1 ? 'were not' : 'was not'} saved due to validation issues.`
      } else {
        toastType = "error"
        toastMessage = `${erroredStudents.length} Student(s) were not saved due to validation issues.`
      }
    }

    toast(toastType, toastMessage)

    studentsDispatch({
      type: SHOW_ADD_STUDENTS_POPUP,
      payload: false
    })

    studentsDispatch({
      type: RELOAD,
      payload: true
    })

    if (erroredStudents.length > 0) {
      studentsDispatch({
        type: SHOW_ERRORED_STUDENTS_POPUP,
        payload: {
          erroredStudents: erroredStudents,
          message: toastMessage,
          reasons
        }
      })
    }
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

  const downloadTemplate = async () => {
    try {
      setIsLoading(true)
      await TemplatesService.downloadTemplate(null);
      setIsLoading(false)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : 'Failed to download the template.')
      console.log(e)
      setIsLoading(false)
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
        auto
        pt={{
          badge: {
            root: {
              style: {
                display: 'none'
              }
            }
          }
        }}
        removeIcon="pi pi-trash"
        emptyTemplate={
          <p className="m-0 text-sm">Click 'Choose' to upload a populated template.</p>
        }
      />
          <div className="mt-5">
            <Button
              label="Download Template"
              icon="pi pi-download"
              type="submit"
              className="custom-button outline"
              disabled={isLoading}
              loading={isLoading}
              onClick={downloadTemplate}
              outlined
            />
          </div>

    </div>
  );
};

export default Uploadcontainer;
