import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { toastStore } from "../../store/toast";
import { Dialog } from "primereact/dialog";
import NewCohortForm from "./NewCohortForm";
import { CohortsService } from "../../services/cohorts.service";
import EditCohortForm from "./EditCohort";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import AddFacilitatorToCohort from "./AddFacilitatorToCohort";
import { truncateStringWithEllipsis, ucFirst } from "../../utils";
import { cleanedDateStr } from "../../utils/moment";
import Table from "../../components/Table/Table";
import MeatballMenu from "../../components/MeatballMenu";

const tableRowItem = "cohorts";


const Studentcohort = ({ user }) => {
  const { toast } = useContext(toastStore);
  const [ cohorts, setCohorts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [createCohortVisibility, setCreateCohortVisibility] = useState(false)
  const [editCohortVisibility, setEditCohortVisibility] = useState(false)
  const [addFacilitatorVisibility, setAddFacilitatorVisibility] = useState(false)

  const [newCohortFormData,setNewCohortFormData]=useState({
    name: "",
    dates: null,
    costPerStudent: 0,
    costPerStudentCurrency: ''
  })

  const [selectedCohort, setSelectedCohort] = useState(null)
  const showDeletePopup = (event, cohort) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to delete the ${cohort.name} cohort?`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: deleteCohort,
      reject: () => {}
    });        
  }

  const deleteCohort = async () => {
    setIsLoading(true)
    try {
        await CohortsService.deleteCohort(selectedCohort.id)
        toast('success', `${selectedCohort.name} cohort has been deleted.`)
        setTimeout(() => {
            window.location.href = '/students?a=Cohorts'
        }, 2000)
    } catch (e) {
        setIsLoading(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
    }
  }

  
  const cohortActionTemplate = (cohort) => {
    const options = setOptions(cohort)
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
      width: '20%'
    },
    {
      id: "startDate",
      name: "Start Date",
      selector: (row) => cleanedDateStr(row.startDate),
      sortable: true,
      width: '10%'
    },
    {
      id: "endDate",
      name: "End Date",
      selector: (row) => cleanedDateStr(row.endDate),
      sortable: true,
      width: '10%'
    },
    {
      id: "description",
      name: "Description",
      selector: (row) => truncateStringWithEllipsis(ucFirst(row.description), 160),
      style: {wordWrap: 'break-word'},
      wrap: true,
      width: '35%'
    },
    {
      id: "costPerStudent",
      name: "Cost Per Student",
      selector: (row) => `${row.costPerStudent ? `${row.costPerStudentCurrency}${row.costPerStudent}` : 'n/a'}`,
      sortable: true,
      width: '15%'
    },
    {
      id: "action",
      name: "Action",
      selector: (row) => cohortActionTemplate(row),
      sortable: true,
    },
  ];

  const handleCohortDelete = (e, cohort) => {
    showDeletePopup(e, cohort)
  }
  
  const handleCohortEdit = (cohort) => {
    setSelectedCohort(cohort)
    setTimeout(() => {
      setEditCohortVisibility(true)
    }, 0)
  }

  const handleAddFacilitator = (cohort) => {
    setSelectedCohort(cohort)
    setTimeout(() => {
      setAddFacilitatorVisibility(true)
    }, 0)
  }

  const setOptions = (cohort) => {
    return [
      { label: "Edit Cohort", icon: "pi pi-pencil", command: () => {handleCohortEdit(cohort)} },
      { label: "Add Facilitator to Cohort", icon: "pi pi-user-plus", command: () => {handleAddFacilitator(cohort)} },
      { label: "View Students", icon: "pi pi-users", url: `/students?a=Students&cohortId=${cohort?.id}`  },
      { label: "View Report", icon: "pi pi-dollar", url: `/reports?cohortId=${cohort?.id}`  },
      // { label: "Message Cohort", icon: "pi pi-comment", command: () => {toast('info', 'This feature is coming soon...')} },
      { label: "Delete Cohort", icon: "pi pi-trash", command: (e) => handleCohortDelete(e, cohort) },
    ]
  }
  const [pagination, setPagination] = useState({ page: 1, limit: 50})
  const handlePaginationChange = (newPagination) => {
    setPagination({
      page: newPagination.page,
      limit: newPagination.limit
    })
    setShouldRefetch(true)
  }

  const [shouldRefetch, setShouldRefetch] = useState(true)
  useEffect(() => {
    async function fetchCohorts() {
      setIsLoading(true)
      try {
        const {data: cohortsRes} = await CohortsService.getCohorts()
        const cohorts = cohortsRes.cohorts.map(cohort => ({ ...cohort, isSelected: false }))
        setCohorts(cohorts)
        setShouldRefetch(false)
        setIsLoading(false)
      } catch (e) {
        setShouldRefetch(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
        setIsLoading(false)
      }
    }
    if (shouldRefetch) {
        fetchCohorts()
    }
  }, [toast, shouldRefetch])
    return (
    <div>
        {
            user.role === 'FACILITATOR' ? null : 
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button
                    className="custom-button" 
                    icon={<AiOutlinePlus />}
                    label="Create new Cohort"
                    onClick={() => setCreateCohortVisibility(true)}
                />
            </div>
    
        }
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* <ListCohortCard key={cohort.id} cohort={cohort} options={options} handleOptionClick={handleOptionClick} setSelectedCohort={setSelectedCohort} /> */}

        {cohorts.length > 0 ? 
        <>
          <Table isLoading={isLoading} columns={columns} data={cohorts} tableRowItem={tableRowItem}
            pagination={pagination} onPaginationChange={handlePaginationChange}>
          </Table>
        </> :
        <div className="flex justify-center">
            {isLoading ? 'Please wait...' : user.role === 'FACILITATOR' ? `You haven't been added to any cohort.` : 'There are no cohorts created.'}
        </div>}
      </div>
      <Dialog
        header="New Cohort"
        visible={createCohortVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setCreateCohortVisibility(false)}
      >
        <div>
          <i className="block text-xs mb-4">NB: A cohort is a grouping of students by time period and curriculum.</i>
          <NewCohortForm formData={newCohortFormData} setFormData={setNewCohortFormData} isLoading={isLoading}  />
        </div>
      </Dialog>
      <Dialog
        header="Edit Cohort"
        visible={editCohortVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setEditCohortVisibility(false)}
      >
        <div>
          <EditCohortForm cohort={selectedCohort} formData={selectedCohort} setFormData={setSelectedCohort} isLoading={isLoading}  />
        </div>
      </Dialog>

      <Dialog
        header={`Add Facilitator to ${selectedCohort?.name ?? 'Cohort'}`}
        visible={addFacilitatorVisibility}
        style={{ width: "30vw" }}
        maximizable
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setAddFacilitatorVisibility(false)}
      >
        <div>
          <AddFacilitatorToCohort cohort={selectedCohort} formData={selectedCohort} setFormData={setSelectedCohort} isLoading={isLoading}  />
        </div>
      </Dialog>

      <ConfirmPopup />
    </div>
  );
};

export default Studentcohort;
