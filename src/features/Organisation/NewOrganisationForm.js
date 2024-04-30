import React, {useContext, useState} from "react";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
import countries from '../../data/countries.json'
import { Dropdown } from 'primereact/dropdown';
import OrganisationService from "../../services/organisation.service";
import { Button } from "primereact/button";
import { toastStore } from "../../store/toast";

const NewOrganisationForm = ({ formData, setFormData, setVisible }) => {
    const { toast } = useContext(toastStore);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const studentsSizeOptions = ['1-100', '100-500', '500+']
    const [numberOfStudents, setNumberOfStudents] = useState(studentsSizeOptions[0]);

    const sizeOptions = ['1-10', '10-100', '100+']
    const [size, setSize] = useState(sizeOptions[0]);

    const studentsAgeOptions = ['Under 18', '18+', 'Both']
    const [studentsAge, setStudentsAge] = useState(studentsAgeOptions[0]);

    const organisationTypes = ['University', 'High School', 'Secondary School', 'Primary School', 'Grant or Scholarship Provider', 'Other - Private Teaching Institution (bootcamp, courses, etc)','Other - NGO'];
    const [selectedOrganisationType, setSelectedOrganisationType] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {selectedCountry ? (
                    <span>
                        <b>{selectedCountry.name}</b> selected.
                    </span>
                ) : (
                    'No country selected.'
                )}
            </div>
        );
    };

    const [error, setError] = useState()
    const onChange=(e)=>{
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleOrganisationNameChange = (e) => {
        handleOrganisationNameBlur(e)
        setTimeout(() => {
            onChange(e)
        }, 0)
    }

    const handleOrganisationNameBlur = (e) => {
        const organisationName = e.target.value;
        if (organisationName !== '') {
            const studentNumberPrefix = organisationName.toUpperCase().split(' ').map(part => part[0]).join('')
            if (studentNumberPrefix) {
                setStudentNumberPrefix(studentNumberPrefix)
                setShowStudentNumberPrefix(true)
            }
        } else {
            setStudentNumberPrefix('')
            setShowStudentNumberPrefix(false)
        }
    }

    const handleCountryChange = (e) => {
        setSelectedCountry(e.value)
    }

    const handleSizeChange = (e) => {
        setSize(e.value)
    }

    const handleNumberOfStudentsChange = (e) => {
        setNumberOfStudents(e.value)
    }

    const handleStudentsAgeChange = (e) => {
        setStudentsAge(e.value)
        onChange({ target : { name: 'studentsAge', value: e.target.value } })
    }
    
    const handleOrganisationTypeChange = (e) => {
        setSelectedOrganisationType(e.value)
        onChange({ target : { name: 'type', value: e.value } })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !selectedCountry || !selectedOrganisationType) {
            return toast('error', 'Please fill in the required* fields')
        } else {
            setIsLoading(true)
    
            let newOrganisation = Object.assign(formData, {})
    
            newOrganisation.country = selectedCountry.code;
            newOrganisation.size = size;
            newOrganisation.numberOfStudents = numberOfStudents;
            newOrganisation.studentNumberPrefix = studentNumberPrefix
            newOrganisation.studentsAge = studentsAge
    
            try {
                setIsLoading(false)
                await OrganisationService.createOrganisation(newOrganisation)
                toast('success', 'Your Organisation has been created.')
                setTimeout(() => {
                    window.location.href = '/organisation'
                    setVisible(false)
                }, 2000)
            } catch (e) {
                setIsLoading(false)
                toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
            }
        }
    }

    const [studentNumberPrefix, setStudentNumberPrefix] = useState('')
    const [showStudentNumberPrefix, setShowStudentNumberPrefix] = useState(false)
    const [showStudentNumberPrefixInput, setShowStudentNumberPrefixInput] = useState(false)

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-900 font-medium mb-20">Name of Organisation*</label>
            <InputText name="name" id="name" type="text" placeholder="" className="w-full" onChange={handleOrganisationNameChange} required/>
            {showStudentNumberPrefix ? <span className="text-xs mb-3">Student Numbers will be like: <b>{studentNumberPrefix}0001</b> {!showStudentNumberPrefixInput ? <span className="cursor-pointer text-primary text-underline" onClick={() => setShowStudentNumberPrefixInput(true)}>Change</span> : null } </span> : null }
    
            {showStudentNumberPrefixInput ? 
                <>
                    <label htmlFor="studentNumberPrefix" className="block text-900 font-medium mt-3 mb-20">Organisation Prefix*</label>
                    <InputText name="studentNumberPrefix" value={studentNumberPrefix} id="studentNumberPrefix" type="text" placeholder="" className="w-full mb-3" onChange={(e) => setStudentNumberPrefix(e.target.value)} required/>
                </>
                : 
                null
            }
            <label htmlFor="registrationNumber" className="block text-900 font-medium mt-3 mb-20">Registration Number (Optional)</label>
            <InputText name="registrationNumber" id="registrationNumber" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="address" className="block text-900 font-medium mb-20">Address</label>
            <InputText name="address" id="address" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="city" className="block text-900 font-medium mb-20">City</label>
            <InputText name="city" id="city" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="address" className="block text-900 font-medium mb-20">Country*</label>
            <div className="card flex mb-3">
                <Dropdown value={selectedCountry} onChange={handleCountryChange} options={countries} optionLabel="name" placeholder="Select a Country" 
                    valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full" panelFooterTemplate={panelFooterTemplate} />
            </div>   

            <label htmlFor="size" className="block text-900 font-medium mb-20">Organisation Size</label>
            <div className="card flex mb-3">
                <SelectButton name="size" value={size} onChange={handleSizeChange} options={sizeOptions} />
            </div>

            <label htmlFor="numberOfStudents" className="block text-900 font-medium mb-20">Number of Students</label>
            <div className="card flex mb-3">
                <SelectButton name="numberOfStudents" value={numberOfStudents} onChange={handleNumberOfStudentsChange} options={studentsSizeOptions} />
            </div>

            <label htmlFor="size" className="block text-900 font-medium mb-20">Age of Students</label>
            <div className="card flex mb-3">
                <SelectButton name="studentsAge" value={studentsAge} onChange={handleStudentsAgeChange} options={studentsAgeOptions} />
            </div>

            <label htmlFor="type" className="block text-900 font-medium mb-20">Organisation Type*</label>
            <Dropdown scrollHeight="260px" value={selectedOrganisationType} onChange={handleOrganisationTypeChange} options={organisationTypes}
                placeholder="Select an organisation Type" className="w-full  h-max md:w-14rem" />
         
            {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
            <div className="w-full mt-3"
>
                <Button
                    label="Save"
                    loading={isLoading}
                    icon="pi pi-building"
                    onClick={handleSubmit}
                    className="custom-button "
                />
            </div>

        </form>
    </div>
    );
};

export default NewOrganisationForm;
