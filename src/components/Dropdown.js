import {useState} from 'react'
import { Dropdown } from 'primereact/dropdown';
        

const Dropdowncomp = ({projectoption, onSelected, placeholder, isLoading = true, label, selectedOption }) => {

  const handleSelectedOption = (e) => {
    onSelected(e.value)
  }
  return (
    <span className="p-float-label">
    <Dropdown value={selectedOption} loading={isLoading} onChange={(e) => handleSelectedOption(e)} options={projectoption} optionLabel="name" 
              placeholder={placeholder ?? "Select an option"}/>
              {label ? <label htmlFor="item">{label}</label> : null }
  </span>
)
}

export default Dropdowncomp
