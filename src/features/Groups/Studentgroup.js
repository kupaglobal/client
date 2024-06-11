import React, { useContext, useEffect, useState } from "react";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { toastStore } from "../../store/toast";
import { GroupsService } from "../../services/groups.service";
import NewGroupForm from "./NewGroupForm";
import { Dialog } from "primereact/dialog";
import MeatballMenu from "../../components/MeatballMenu";
import { cleanedDateStr } from "../../utils/moment";
import Table from "../../components/Table/Table";
import EditGroupForm from "./EditGroup";

// const options = [
//   { label: "Edit Group", icon: "pi pi-pencil" },
//   { label: "Add Student", icon: "pi pi-user-plus" },
//   { label: "Message Group", icon: "pi pi-comment" },
//   { label: "Delete Group", icon: "pi pi-trash" },
// ];

const Studentgroup = ({ user }) => {
  const { toast } = useContext(toastStore);
  const [ groups, setGroups ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [createGroupVisibility, setCreateGroupVisibility] = useState(false)
  const [editGroupVisibility, setEditGroupVisibility] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

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
      window.location.href = '/students?a=Tags'
      setIsLoading(false)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }
  }

  const showDeletePopup = (event, group) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to delete the ${group.name} group?`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => deleteGroup(group),
      reject: () => {}
    });        
  }

  const deleteGroup = async (group) => {
    setIsLoading(true)
    try {
        await GroupsService.deleteGroup(group.id)
        toast('success', `${group.name} tag has been deleted.`)
        setTimeout(() => {
            window.location.href = '/students?a=Tags'
        }, 2000)
    } catch (e) {
        setIsLoading(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
    }
  }

  const groupActionTemplate = (group) => {
    const options = setOptions(group)
    return <div>
      <MeatballMenu options={options} />
    </div>
  }

  const columns = [
    {
      id: "name",
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: '35%'
    },
    {
      id: "dateCreated",
      name: "Date Created",
      selector: (row) => `${cleanedDateStr(row.dateCreated)}`,
      sortable: true,
      width: '35%'
    },
    {
      id: "action",
      name: "Action",
      selector: (row) => groupActionTemplate(row),
      width: '30%'
    },
  ];

  const handleGroupDelete = (e, group) => {
    setSelectedGroup(group)
    setTimeout(() => {
      showDeletePopup(e, group)
    }, 0)
  }
  
  const handleGroupEdit = (group) => {
    setSelectedGroup(group)
    setTimeout(() => {
      setEditGroupVisibility(true)
    }, 0)
  }
  const setOptions = (group) => {
    return [
      { label: "Edit Group", icon: "pi pi-pencil", command: () => {handleGroupEdit(group)} },
      // { label: "Add Student", icon: "pi pi-user-plus" },
      // { label: "Message Group", icon: "pi pi-comment" },
      { label: "Delete Group", icon: "pi pi-trash", command: (e) => handleGroupDelete(e, group) },
    ]
  }
  
  // const setOptions = (cohort) => {
  //   return [
  //     { label: "Edit Cohort", icon: "pi pi-pencil", command: () => {handleGroupEdit(cohort)} },
  //     { label: "Add Facilitator to Cohort", icon: "pi pi-user-plus", command: () => {handleAddFacilitator(cohort)} },
  //     { label: "View Students", icon: "pi pi-users", url: `/students?a=Students&cohortId=${cohort?.id}`  },
  //     { label: "View Report", icon: "pi pi-dollar", url: `/reports?cohortId=${cohort?.id}`  },
  //     // { label: "Message Cohort", icon: "pi pi-comment", command: () => {toast('info', 'This feature is coming soon...')} },
  //     { label: "Delete Cohort", icon: "pi pi-trash", command: (e) => handleCohortDelete(e, cohort) },
  //   ]
  // }

  const tableRowItem = "groups"
  
  const [pagination, setPagination] = useState({ page: 1, limit: 50})
  const handlePaginationChange = (newPagination) => {
    setPagination({
      page: newPagination.page,
      limit: newPagination.limit
    })
    shouldRetry(true)
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
        {groups.length > 0 ? 
        <>
          <Table isLoading={isLoading} columns={columns} data={groups} tableRowItem={tableRowItem}
            pagination={pagination} onPaginationChange={handlePaginationChange}>
          </Table>
        </> :
        <div className="flex justify-center">
            There are no groups created yet.
        </div>}
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
        header="Edit Group"
        visible={editGroupVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setEditGroupVisibility(false)}
      >
        <div>
          <EditGroupForm formData={selectedGroup} setFormData={setSelectedGroup} group={selectedGroup} isLoading={isLoading} />
        </div>
      </Dialog>

      <ConfirmPopup />

    </div>
  );
};

export default Studentgroup;
