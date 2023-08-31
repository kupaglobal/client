import {useState} from 'react'
import { Dropdown } from 'primereact/dropdown';
        

const Dropdowncomp = ({projectoption}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div style={{paddingTop: '10px'}}>
      <Dropdown value={selectedOption} onChange={(e) => setSelectedOption(e.value)} options={projectoption} optionLabel="name" 
                placeholder="Select an option"/>
    </div>
  )
}

export default Dropdowncomp
