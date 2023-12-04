import { useContext, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import {MdFullscreenExit, MdFullscreen} from 'react-icons/md'
import { Button } from "primereact/button";
import { TemplatesService } from "../../../services/templates.service";
import { toastStore } from "../../../store/toast";
import { templatesStore } from "../../../store/templates";
import Table from "../../../components/Table/Table";

const Templateroute1 = ({ setActiveStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const downloadTemplate = async (template) => {
    try {
      setIsDownloading(template.id)
      await TemplatesService.downloadTemplate(template);
      setIsDownloading(null)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : 'Failed to download the template.')
      console.log(e)
      setIsDownloading(null)
    }
  }

  const { toast } = useContext(toastStore);
  const { state } = useContext(templatesStore)
  const template = state.activeTemplate

  const columns = template.fields.map(field => ({
    id: field.columnName,
    name: field.displayName,
    selector: (row) => row[field.columnName],
  }))

  const tableRowItem = "studentFields";

  const exampleStudent = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'MALE',
    dateOfBirth: '14/06/2004',
    courseEnrollment: 'Big Data',
    guardianName: 'Jane Doe',
    guardianContactInfo: 'jane@family.com',
    ambitions: ['Top of the Class'],
    skills: ['Big Data Analytics'],
    interests: ['AI in Big Data'],
    educationalBackground: 'John has been an exceptional student from a very young age.'
  }

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        {/* <Avatar
          alt="Template"
          variant="rounded"
          src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        /> */}
        <Typography component="div" fontSize={15}>
          Template: <span className="font-bold">{template && template.name}</span> will look like something this...
        </Typography>
      </div>
      <div>
        <Box sx={{ p: 2, border: "1px dashed grey", height: 200 }}>

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

          <Table columns={columns} data={[exampleStudent]} tableRowItem={tableRowItem} hideSearch={true}/>

        </Box>
        <Button icon="pi pi-download" outlined label="Download" className="mt-2" loading={isDownloading} onClick={() => downloadTemplate(template)}></Button>
        <Button style={{float: 'right'}} className="outline mt-2" onClick={() => setActiveStep(2)}>Proceed</Button>
      </div>
    </>
  );
};

export default Templateroute1;
