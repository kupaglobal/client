import React, {useState} from "react";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import countries from '../../data/countries.json'
import { Dropdown } from 'primereact/dropdown';
import OrganisationService from "../../services/organisation.service";

const NewOrganisationForm = ({ formData, setFormData }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const studentsSizeOptions = ['1-100', '100-500', '500+']
    const [numberOfStudents, setNumberOfStudents] = useState(studentsSizeOptions[0]);

    const sizeOptions = ['1-10', '10-100', '100+']
    const [size, setSize] = useState(sizeOptions[0]);

    const studentsAgeOptions = ['13-19', '19+']
    const [studentsAge, setStudentsAge] = useState(studentsAgeOptions[0]);

    const organisationTypes = ['University', 'High School', 'Secondary School', 'Primary School', 'Grant or Scholarship Provider', 'Other - Private Teaching Institution (bootcamp, courses, etc)','Other - NGO'];
    const [selectedOrganisationType, setSelectedOrganisationType] = useState("")

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
        console.log('inOnchanges', e.target.name)
        setError('')
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const goTo = useNavigate()

    const handleCountryChange = (e) => {
        setSelectedCountry(e.value)
        onChange({ target : { name: 'country', value: e.value.code } })
    }

    const handleSizeChange = (e) => {
        setSize(e.value)
        onChange({ target : { name: 'size', value: e.value } })
    }

    const handleNumberOfStudentsChange = (e) => {
        setNumberOfStudents(e.value)
        onChange({ target : { name: 'numberOfStudents', value: e.value } })
    }

    const handleStudentsAgeChange = (e) => {
        setStudentsAge(e.value)
        onChange({ target : { name: 'studentsAge', value: e.value } })
    }
    
    const handleOrganisationTypeChange = (e) => {
        setSelectedOrganisationType(e.value)
        onChange({ target : { name: 'type', value: e.value } })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError()

        formData.country = selectedCountry;
        formData.size = size;

        try {
            await OrganisationService.createOrganisation(formData)
            goTo('/organisation')
        } catch (e) {
            setError(e.response?.data?.error ? e.response?.data?.error : e.message)
        }
    }

    return (
    <div className="w-full m-auto m-2">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-900 font-medium mb-20">Name</label>
            <InputText name="name" id="name" type="text" placeholder="" className="w-full mb-3" onChange={onChange} required/>

            <label htmlFor="registrationNumber" className="block text-900 font-medium mb-20">Registration Number (Optional)</label>
            <InputText name="registrationNumber" id="registrationNumber" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="address" className="block text-900 font-medium mb-20">Address</label>
            <InputText name="address" id="address" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="city" className="block text-900 font-medium mb-20">City</label>
            <InputText name="city" id="city" type="text" placeholder="" className="w-full mb-3" onChange={onChange}/>

            <label htmlFor="address" className="block text-900 font-medium mb-20">Country</label>
            <div className="card flex mb-3">
                <Dropdown value={selectedCountry} onChange={handleCountryChange} options={countries} optionLabel="name" placeholder="Select a Country" 
                    valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" panelFooterTemplate={panelFooterTemplate} />
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

            <label htmlFor="type" className="block text-900 font-medium mb-20">Organisation Type</label>
            <Dropdown scrollHeight="260px" value={selectedOrganisationType} onChange={handleOrganisationTypeChange} options={organisationTypes}
                placeholder="Select an organisation Type" className="w-full  h-max md:w-14rem" />
         
            {error!=='' ? <div><span className="line-height-3 text-red-500 mb-3">{error}</span></div> : null}
        </form>
    </div>
    );
};

export default NewOrganisationForm;
