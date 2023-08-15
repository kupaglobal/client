import React from 'react'
import {Select,
    MenuItem,
    FormControl,
    InputLabel,} from '@mui/material';


const Dropdown = ({labelname, projectoption, selectedOption, handleOptionSelect}) => {
  return (
    <div>
          <FormControl sx={{ m: 1, minWidth: 150 }}  size="small">
            <InputLabel sx={{fontSize: 13}}>{labelname}</InputLabel>

              <Select
                id="simple-select"
                value={selectedOption}
                label="Select Option"
                onChange={handleOptionSelect}
                sx={{fontSize: 13}}
              >
                {projectoption.map((project) => (
                  <MenuItem key={project.id} value={project.name} sx={{fontSize: 13}}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
    </div>
  )
}

export default Dropdown
