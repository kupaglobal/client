import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";

const FilterOption = ({ filterOption, formData, setFormData }) => {
  // const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const [dates, setDates] = useState(null);
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

  //   // setFilteredData([]);

  //   // setSearchText(e.target.value);
  // };
  const setDateConducted = (e) => {
    setDates(e.value)
    if (e.value) {
      const [fromDateConducted, toDateConducted] = [...e.value];
      setFormData({ ...formData, fromDateConducted, toDateConducted })
    }
  }
  // const handleRowSelected = (rows) => {
  //   // Add this function
  // };

  const onChange = (e) => {
    setTimeout(() => {
      setFormData({...formData,[e.target.name]:e.target.value})
      console.log(formData, e.target.name)
    }, 0)
  }

  const setOption = () => {
    switch(filterOption.type) {
      case 'date':
        return <>
          <label className="block text-xs" htmlFor={filterOption.id}>{filterOption.displayName}</label>
          <Calendar inputId={filterOption.id} showIcon numberOfMonths={2} value={dates} onChange={(e) => setDateConducted(e)} className="mb-3 p-inputtext-sm" selectionMode={filterOption.isRange ? "range" : "single"} dateFormat="yy/mm/dd" showButtonBar placeholder="StartDate - EndDate" touchUI/> 
        </>
      case 'string':
        return <>
          <label className="block text-xs" htmlFor={filterOption.id}>{filterOption.displayName}</label>
          <InputText name={filterOption.id} value={formData[filterOption.id]} id={filterOption.id} type="text" placeholder={filterOption.placeholder} className="w-full mb-3 p-inputtext-sm" onInput={onChange} required/>
        </>

      case 'number':
        return <>
          <label className="block text-xs" htmlFor={filterOption.id}>{filterOption.displayName}</label>
          <InputText name={filterOption.id} keyfilter="int" id={filterOption.id} type="text" placeholder={filterOption.placeholder} className="w-full mb-3 p-inputtext-sm" onInput={onChange} onBlur={onChange} required/>
        </>

      default: <></>
    } 
  }

  return (
    <>
      <div className="mr-2">
        {setOption()}
      </div>
    </>
  );
};

export default FilterOption;
