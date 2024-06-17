import React, { useContext, useEffect, useState } from "react";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { toastStore } from "../../store/toast";
import { TagsService } from "../../services/tags.service";
import NewTagForm from "./NewTagForm";
import { Dialog } from "primereact/dialog";
import MeatballMenu from "../../components/MeatballMenu";
import { cleanedDateStr } from "../../utils/moment";
import Table from "../../components/Table/Table";
import EditTagForm from "./EditTag";

// const options = [
//   { label: "Edit Tag", icon: "pi pi-pencil" },
//   { label: "Add Student", icon: "pi pi-user-plus" },
//   { label: "Message Student with Tag", icon: "pi pi-comment" },
//   { label: "Delete Tag", icon: "pi pi-trash" },
// ];

const Studenttag = ({ user }) => {
  const { toast } = useContext(toastStore);
  const [ tags, setTags ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [createTagVisibility, setCreateTagVisibility] = useState(false)
  const [editTagVisibility, setEditTagVisibility] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)

  const [formData,setFormData]=useState({
    "name": ""
  })

  const footerContent = (

    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setCreateTagVisibility(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Create Tag"
        icon="pi pi-users"
        onClick={() => createTag()}
        className="custom-button"
        disabled={!formData.name}
        loading={isLoading}
      />
    </div>
  );
  
  const createTag = async () => {
    setIsLoading(true)
    try {
      await TagsService.createTag(formData)
      toast('success', 'New Tag Created')
      window.location.href = '/students?a=Tags'
      setIsLoading(false)
    } catch (e) {
      console.log('e', e)
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }
  }

  const showDeletePopup = (event, tag) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to delete the ${tag.name} tag?`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => deleteTag(tag),
      reject: () => {}
    });        
  }

  const deleteTag = async (tag) => {
    setIsLoading(true)
    try {
        await TagsService.deleteTag(tag.id)
        toast('success', `${tag.name} tag has been deleted.`)
        setTimeout(() => {
            window.location.href = '/students?a=Tags'
        }, 2000)
    } catch (e) {
        setIsLoading(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
    }
  }

  const tagActionTemplate = (tag) => {
    const options = setOptions(tag)
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
      selector: (row) => tagActionTemplate(row),
      width: '30%'
    },
  ];

  const handleTagDelete = (e, tag) => {
    setSelectedTag(tag)
    setTimeout(() => {
      showDeletePopup(e, tag)
    }, 0)
  }
  
  const handleTagEdit = (tag) => {
    setSelectedTag(tag)
    setTimeout(() => {
      setEditTagVisibility(true)
    }, 0)
  }
  const setOptions = (tag) => {
    return [
      { label: "Edit tag", icon: "pi pi-pencil", command: () => {handleTagEdit(tag)} },
      // { label: "Add Student", icon: "pi pi-user-plus" },
      // { label: "Message Student with Tag", icon: "pi pi-comment" },
      { label: "Delete Tag", icon: "pi pi-trash", command: (e) => handleTagDelete(e, tag) },
    ]
  }
  
  // const setOptions = (cohort) => {
  //   return [
  //     { label: "Edit Cohort", icon: "pi pi-pencil", command: () => {handleTagEdit(cohort)} },
  //     { label: "Add Facilitator to Cohort", icon: "pi pi-user-plus", command: () => {handleAddFacilitator(cohort)} },
  //     { label: "View Students", icon: "pi pi-users", url: `/students?a=Students&cohortId=${cohort?.id}`  },
  //     { label: "View Report", icon: "pi pi-dollar", url: `/reports?cohortId=${cohort?.id}`  },
  //     // { label: "Message Cohort", icon: "pi pi-comment", command: () => {toast('info', 'This feature is coming soon...')} },
  //     { label: "Delete Cohort", icon: "pi pi-trash", command: (e) => handleCohortDelete(e, cohort) },
  //   ]
  // }

  const tableRowItem = "tags"
  
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
    async function fetchTags() {
      try {
        const {data: tagsRes} = await TagsService.getTags()
        const tags = tagsRes.tags.map(tag => ({ ...tag, isSelected: false }))
        setTags(tags)
      } catch (e) {
        setShouldRetry(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    if (shouldRetry) {
      fetchTags()

    }
  }, [toast, shouldRetry])
    return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <Button
          className="custom-button"
          icon={<AiOutlinePlus />}
          label="Create new Tag"
          outlined
          onClick={() => setCreateTagVisibility(true)}
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
        {tags.length > 0 ? 
        <>
          <Table isLoading={isLoading} columns={columns} data={tags} tableRowItem={tableRowItem}
            pagination={pagination} onPaginationChange={handlePaginationChange}>
          </Table>
        </> :
        <div className="flex justify-center">
            There are no tags created yet.
        </div>}
      </div>
      <Dialog
        header="New Tag"
        visible={createTagVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setCreateTagVisibility(false)}
        footer={footerContent}
      >
       <div>
          <NewTagForm formData={formData} setFormData={setFormData} />
        </div>
      </Dialog>
      <Dialog
        header="Edit Tag"
        visible={editTagVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setEditTagVisibility(false)}
      >
        <div>
          <EditTagForm formData={selectedTag} setFormData={setSelectedTag} tag={selectedTag} isLoading={isLoading} />
        </div>
      </Dialog>

      <ConfirmPopup />

    </div>
  );
};

export default Studenttag;
