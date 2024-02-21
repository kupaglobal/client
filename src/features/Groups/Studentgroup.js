import React, { useContext, useEffect, useState } from "react";
import ListGroupCard from "../../components/Cards/ListGroupCard";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { toastStore } from "../../store/toast";
import { GroupsService } from "../../services/groups.service";
import NewGroupForm from "./NewGroupForm";
import { Dialog } from "primereact/dialog";
import NewCohortForm from "../Cohorts/NewCohortForm";

const options = [
  { label: "Edit Group", icon: "pi pi-pencil" },
  { label: "Add Student", icon: "pi pi-user-plus" },
  { label: "Message Group", icon: "pi pi-comment" },
  { label: "Delete Group", icon: "pi pi-trash" },
];

const Studentgroup = () => {
  const { toast } = useContext(toastStore);
  const [ groups, setGroups ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [createGroupVisibility, setCreateGroupVisibility] = useState(false)
  const [createCohortVisibility, setCreateCohortVisibility] = useState(false)

  const [formData,setFormData]=useState({
    "name": ""
  })
  const [newCohortFormData,setNewCohortFormData]=useState({
    name: "",
    dates: null
  })

  const footerContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setCreateGroupVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Create Group"
        icon="pi pi-users"
        onClick={() => createGroup()}
        className="custom-button"
        disabled={!formData.name}
        loading={isLoading}
      />
    </div>
  );
  
  const createGroup = async () => {
    setIsLoading(true)
    try {
      await GroupsService.createGroup(formData)
      toast('success', 'New Group Created')
      window.location.href = '/students?a=Groups'
      setIsLoading(false)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }
  }

  const createCohort = async () => {
    setIsLoading(true)
    try {
      // await GroupsService.createGroup(formData)
      toast('success', 'New Group Created')
//      window.location.href = '/students?a=Groups'
      setIsLoading(false)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }

  }

  const [shouldRetry, setShouldRetry] = useState(true)
  useEffect(() => {
    async function fetchGroups() {
      try {
        const {data: groupsRes} = await GroupsService.getGroups()
        const groups = groupsRes.groups.map(group => ({ ...group, isSelected: false }))
        setGroups(groups)
      } catch (e) {
        setShouldRetry(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    if (shouldRetry) {
      fetchGroups()

    }
  }, [toast, shouldRetry])
    return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <Button
          className="custom-button"
          icon={<AiOutlinePlus />}
          label="Create new Group"
          outlined
          onClick={() => setCreateGroupVisibility(true)}
        />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {groups.map(group => (
          <ListGroupCard key={group.id} group={group} options={options} />
        ))}
      </div>
      <Dialog
        header="New Group"
        visible={createGroupVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setCreateGroupVisibility(false)}
        footer={footerContent}
      >
       <div>
          <NewGroupForm formData={formData} setFormData={setFormData} />
        </div>
      </Dialog>
      <Dialog
        header="New Cohort"
        visible={createCohortVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setCreateCohortVisibility(false)}
      >
        <div>
          <NewCohortForm formData={newCohortFormData} setFormData={setNewCohortFormData} createCohort={createCohort} />
        </div>
      </Dialog>


    </div>
  );
};

export default Studentgroup;
