import React, { useContext, useEffect, useState } from "react";
import ListGroupCard from "../../components/Cards/ListGroupCard";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { toastStore } from "../../store/toast";
import { GroupsService } from "../../services/groups.service";
import NewGroupForm from "./NewGroupForm";
import { Dialog } from "primereact/dialog";
import { useSearchParams } from "react-router-dom";

const options = [
  { label: "Edit Group", icon: "pi pi-pencil" },
  { label: "Add Student", icon: "pi pi-user-plus" },
  { label: "Message Group", icon: "pi pi-comment" },
  { label: "Delete Group", icon: "pi pi-trash" },
];

const studentData = [
  {
    studentname1: "John Doe",
    studentname2: "Alice Johnson",
    studentname3: "Bob Smith",
    groupname: "Peer Group 2 English 101",
  },
  {
    studentname1: "Eva Martinez",
    studentname2: "David Wilson",
    studentname3: "Linda Davis",
    groupname: "Science Geeks",
  },
  {
    studentname1: "John Doe",
    studentname2: "Alice Johnson",
    studentname3: "Bob Smith",
    groupname: "Peer Group 4 Math101",
  },
  {
    studentname1: "Eva Martinez",
    studentname2: "David Wilson",
    studentname3: "Linda Davis",
    groupname: "All Females in Harare",
  },
  {
    studentname1: "Eva Martinez",
    studentname2: "David Wilson",
    studentname3: "Linda Davis",
    groupname: "Science Geeks",
  },
];

const Studentgroup = () => {
  const { toast } = useContext(toastStore);
  const [ groups, setGroups ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [createGroupVisibility, setCreateGroupVisibility] = useState(false)

  const [formData,setFormData]=useState({
    "name": ""
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

  const { } = useSearchParams({ })

  useEffect(() => {
    async function fetchGroups() {
      try {
        const {data: groupsRes} = await GroupsService.getGroups()
        const groups = groupsRes.groups.map(group => ({ ...group, isSelected: false }))
        setGroups(groups)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    fetchGroups()
  }, [toast])
    return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
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


    </div>
  );
};

export default Studentgroup;
