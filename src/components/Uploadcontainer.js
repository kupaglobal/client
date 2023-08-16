import React from "react";
import { FileUpload } from "primereact/fileupload";
import styled from 'styled-components';

const StyledFileUpload = styled(FileUpload)`
  .p-button {
    font-size: 13px;
    padding: 8px 15px
  }
  
`;


const Uploadcontainer = () => {
  return (
    <div >
      <StyledFileUpload
        name="upload"
        url={"/api/upload"}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
};

export default Uploadcontainer;
