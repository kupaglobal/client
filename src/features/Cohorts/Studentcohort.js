import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { toastStore } from "../../store/toast";
import { Dialog } from "primereact/dialog";
import NewCohortForm from "./NewCohortForm";
import { CohortsService } from "../../services/cohorts.service";
import ListCohortCard from "../../components/Cards/ListCohortCard";
import EditCohortForm from "./EditCohort";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import AddFacilitatorToCohort from "./AddFacilitatorToCohort";

const Studentcohort = ({ user }) => {
  const { toast } = useContext(toastStore);
  const [ cohorts, setCohorts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [createCohortVisibility, setCreateCohortVisibility] = useState(false)
  const [editCohortVisibility, setEditCohortVisibility] = useState(false)
  const [addFacilitatorVisibility, setAddFacilitatorVisibility] = useState(false)

  const [newCohortFormData,setNewCohortFormData]=useState({
    name: "",
    dates: null
  })

  const [selectedCohort, setSelectedCohort] = useState(null)

  const showDeletePopup = (event) => {
    confirmPopup({
        target: event.currentTarget,
        message: `Do you want to delete the ${selectedCohort.name} cohort?`,
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

  const options = [
    { label: "Edit Cohort", icon: "pi pi-pencil", command: () => {setEditCohortVisibility(true)} },
    { label: "Add Facilitator to Cohort", icon: "pi pi-user-plus", command: () => {setAddFacilitatorVisibility(true)} },
    { label: "View Students", icon: "pi pi-users", url: `/students?a=Students&cohortId=${selectedCohort?.id}`  },
    { label: "Message Cohort", icon: "pi pi-comment", command: () => {toast('info', 'This feature is coming soon...')} },
    { label: "Delete Cohort", icon: "pi pi-trash", command: showDeletePopup },
  ];

  const handleOptionClick = () => {}

  const [shouldRefetch, setShouldRefetch] = useState(true)
  useEffect(() => {
    async function fetchCohorts() {
      try {
        const {data: cohortsRes} = await CohortsService.getCohorts()
        const cohorts = cohortsRes.cohorts.map(cohort => ({ ...cohort, isSelected: false }))
        setCohorts(cohorts)
        setShouldRefetch(false)
      } catch (e) {
        setShouldRefetch(false)
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
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
        {cohorts.length > 0 ? cohorts.map(cohort => (
          <ListCohortCard key={cohort.id} cohort={cohort} options={options} handleOptionClick={handleOptionClick} setSelectedCohort={setSelectedCohort} />
        )) : 
        <div className="flex justify-center">
            You haven't been added to any cohort.
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
        header="Add Facilitator to Cohort"
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
