import React, { useContext, useEffect } from "react";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Card } from "primereact/card";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { ucFirst } from "../../../utils";
import { toastStore } from "../../../store/toast";
import { GroupsService } from "../../../services/groups.service";
import { Dialog } from "primereact/dialog";
import Dropdowncomp from "../../../components/Dropdown";
import { AssessmentsService } from "../../../services/assessments.service";

const Assessmentcontent = ({ assessment }) => {
  const handleClickOpen = () => {};
  const categories = [
    // { name: "Review assessment", key: "RA" },
    // { name: "Submit portfolio files", key: "SPF" },
    // { name: "Request for feedback", key: "RCE" },
  ];

  const [selectedCategories] = useState([categories[1]]);
  const userDetails = [
    { heading: "Type", paragraph: assessment.type },
  ];

  const { toast } = useContext(toastStore)


  const [downloadTemplateVisibility, setDownloadTemplateVisibility] = useState(false);
  const [groups, setGroups] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchGroups() {
      try {
        const {data: groupsRes} = await GroupsService.getGroups()
        const groups = groupsRes.groups.map(group => ({ ...group, isSelected: false }))
        setGroups(groups)
      } catch (e) {
        toast('error',e.response?.data?.message ? e.response?.data?.message : e.message)
        console.log(e)
      }
    }
    fetchGroups()
  }, [toast])
  const [selectedGroup, setSelectedGroup] = useState('')

  const downloadTemplate = async () => {
    try {
      setIsLoading(true)
      await AssessmentsService.downloadAssessmentTemplate(assessment, null, selectedGroup.id) 
      setIsLoading(false)
      setDownloadTemplateVisibility(false)
    } catch (e) {
      toast('error', e)
      setIsLoading(false)
    }
  }

  const downloadTemplateFooterContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setDownloadTemplateVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Dowload"
        icon="pi pi-download"
        onClick={() => downloadTemplate()}
        className="custom-button"
        disabled={!selectedGroup}
        loading={isLoading}
      />
    </div>
  );

  return (
    <>
      <Card style={{ width: "300px" }}>
        <div
          className="parts__image"
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: "8px" }}>
              {assessment.name}
            </p>

            {/* {student.phone && student.phone!=='N/a' ? 
              <Link 
                to={`https://wa.me/${student.phone}?text=HI%20${student.firstName},%20`}
                target="_blank"
              >
                <Button
                  icon={<BiLogoWhatsapp size={22} />}
                  aria-label="Message"
                  text
                  style={{ alignItems: "flex-start", padding: 0 }}
                />
              </Link> 
              : ''} */}
          </div>
          <div>
          <p style={{ fontSize: 14, fontWeight: 800, marginBottom: "8px" }}>
              {ucFirst(assessment.type)}
            </p>

          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            label="Download Template"
            icon="pi pi-user-edit"
            className="p-button-outlined p-button-sm"
            onClick={() => setDownloadTemplateVisibility(true)}
          />

          {/* <Button
            label="Share"
            icon="pi pi-share-alt"
            className="p-button-outlined p-button-sm"
          /> */}
        </div>
      </Card>
      <Dialog
        header="Download template"
        visible={downloadTemplateVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setDownloadTemplateVisibility(false)}
        footer={downloadTemplateFooterContent}
      >
        <div>
          <p style={{ fontSize: "13px" }}>
            Select a group to download the template.
          </p>
          <Dropdowncomp
            projectoption={groups}
            onSelected={setSelectedGroup}
          />
        </div>

      </Dialog>

    </>
  );
};

export default Assessmentcontent;
