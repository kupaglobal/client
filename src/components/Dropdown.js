import {useState} from 'react'
import { Dropdown } from 'primereact/dropdown';
        

const Dropdowncomp = ({projectoption, onSelected}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectedOption = (e) => {
    setSelectedOption(e.value)
    onSelected(e.value)
  }
  return (
    <div style={{paddingTop: '10px'}}>
      <Dropdown value={selectedOption} onChange={(e) => handleSelectedOption(e)} options={projectoption} optionLabel="name" 
                placeholder="Select an option"/>
    </div>
  )
}

export default Dropdowncomp
