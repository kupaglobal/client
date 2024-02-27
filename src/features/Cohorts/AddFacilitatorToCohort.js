import React, { useContext, useEffect, useState } from "react";
import { CohortsService } from "../../services/cohorts.service";
import { toastStore } from "../../store/toast";
import { Button } from "primereact/button";
import { UsersService } from "../../services/users.service";
import Dropdowncomp from "../../components/Dropdown";

const AddFacilitatorToCohort = ({ cohort, formData, setFormData }) => {
    const { toast } = useContext(toastStore)
    const [error] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [facilitators, setFacilitators] = useState([])
    const [selectedFacilitator, setSelectedFacilitator] = useState(null)

    const [shouldRefetch, setShouldRefetch] = useState(true)
    useEffect(() => {
        async function fetchFacilitators() {
            const {data: { members: facilitators }} = await UsersService.getUsers({role: 'FACILITATOR'});
            setFacilitators(facilitators.map(facilitator => ({
                ...facilitator,
                name: `${facilitator.firstName} ${facilitator.lastName}`
            })))
            setShouldRefetch(false)
        }
        if (shouldRefetch) {
            fetchFacilitators();
        }
    }, [shouldRefetch])

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        try {
            await CohortsService.addFacilitatorsToCohort(cohort.id, {
                facilitatorIds: [selectedFacilitator.id]
            })
            toast('success', 'Facilitator has been added to Cohort.')
            setIsLoading(false)
            window.location.href = '/students?a=Cohorts'
        } catch (e) {
            toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
            setIsLoading(false)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <div className="mb-10">
                <label htmlFor="name" className="block text-900 font-medium mb-10">Facilitator</label>
                <Dropdowncomp
                    className="mb-4"
                    projectoption={facilitators}
                    onSelected={setSelectedFacilitator}
                />
                {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            </div>
            <div className="flex mt-4">
                <Button
                    label="Assign Facilitator"
                    icon="pi pi-users"
                    type="submit"
                    className="custom-button"
                    disabled={!selectedFacilitator}
                    loading={isLoading}
                />
            </div>
        </form>
    </div>
    );
};

export default AddFacilitatorToCohort;
