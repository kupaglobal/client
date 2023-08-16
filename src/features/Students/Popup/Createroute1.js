import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { Button } from "primereact/button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  .p-button {
    font-size: 12px;
    padding: 8px 15px;
  }
`;
const Createroute1 = () => {
  const [value, setValue] = useState("");
  const categories = [
    { name: "Student name", key: "SN" },
    { name: "Gender", key: "G" },
    { name: "Cohort", key: "C" },
    { name: "Subject", key: "S" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([categories[1]]);

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <p style={{ fontSize: 13, alignSelf: "center" }}>Template Name :</p>
        <InputText value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <p style={{ fontSize: 13, alignSelf: "center" }}>Select Fields</p>
        <div style={{ marginTop: 20 }}>
          {categories.map((category) => {
            return (
              <div key={category.key} style={{ marginBottom: 10 }}>
                <Checkbox
                  inputId={category.key}
                  name="category"
                  value={category}
                  onChange={onCategoryChange}
                  checked={selectedCategories.some(
                    (item) => item.key === category.key
                  )}
                  style={{ marginRight: 10 }}
                />
                <label htmlFor={category.key} style={{ fontSize: 13 }}>
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        label="NEXT"
        text
        style={{ float: "right" }}
        className="custom-button"
      />
    </div>
  );
};

export default Createroute1;
