import React, { useState } from "react";
import "./table.css";
import FilterOption from "./FilterOption"
import { Accordion, AccordionTab } from "primereact/accordion";
import { MdFilter } from "react-icons/md";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";

const FilterOptions = ({ filterOptions = [], onFilter, isLoading }) => {
    let fd = {}
    filterOptions.forEach(filterOption => {
        fd[filterOption.id] = filterOption.type === 'date' && filterOption.isRange ? null : ""
    })

    const [formData,setFormData]=useState(fd)

    const [selectedFilterOptions, setSelectedFilterOptions] = useState([])
    const addToSelectedOptions = (value) => {
        const alreadySelectedOptionIds = selectedFilterOptions.map(option => option.id)
        if (!alreadySelectedOptionIds.includes(value.id)) {
            setCurrentFilterOption(value.id)
            setSelectedFilterOptions([...selectedFilterOptions, value])
        }
    }
  const [currentFilterOption, setCurrentFilterOption] = useState('')  
     
  // const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  // const handleSearch = (e) => {
  //   const value = e.target.value;

  //   // const filteredItems = data.filter((item) => {
  //   //   return columns.some((column) => {
  //   //     const field = item[column.id];
  //   //     if (field === null || field === undefined) {
  //   //       return false;
  //   //     }
  //   //     return field.toString().toLowerCase().includes(value.toLowerCase());
  //   //   });
  //   // });

  //   setFilteredData([]);

  //   setSearchText(e.target.value);
  // };

  const handleSubmit = (selectedFilters) => {
    selectedFilters = selectedFilters.map(option => ({
      ...option,
      value: formData[option.id]
    })).filter(option => option.value)
    onFilter(formData)
  }

  const clearSelection = () => {
    setSelectedFilterOptions([])
    onFilter(null)
  }
  // const handleRowSelected = (rows) => {
  //   // Add this function
  // };

  return (
    <div>
        <Accordion multiple >
          <AccordionTab
            headerClassName="custom-accordion-header"
            header={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <MdFilter size={18} />
                  <span style={{ paddingLeft: "10px" }}>Filter Search Results</span>
                </div>
              </div>
            }
          >
            <div className="flex flex-row w-full">
                {selectedFilterOptions.map((filterOption, index) => {
                    return <FilterOption 
                            filterOption={filterOption}
                            formData={formData}
                            setFormData={setFormData}
                            isLastFilterOption={index === filterOptions.length-1}
                            />
                })}
            </div>
            <Dropdown 
                value={currentFilterOption}
                onChange={(e) => addToSelectedOptions(e.value)}
                options={filterOptions}
                optionLabel="displayName" 
                placeholder="Select a Filter"
                className="w-full md:w-14rem mr-2"
            />
            <Button size="small" className="mr-2" icon="pi pi-filter" loading={isLoading} disabled={selectedFilterOptions.length === 0} onClick={() => handleSubmit(selectedFilterOptions)} />
            { selectedFilterOptions.length > 0 ? <Button size="small" outlined severity="secondary" icon="pi pi-times" onClick={() => clearSelection()} /> : ''}
          </AccordionTab>
        </Accordion>
    </div>
  );
};

export default FilterOptions;
