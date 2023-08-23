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
    { name: "First name", key: "FN" },
    { name: "Last name", key: "LN" },
    { name: "Gender", key: "G" },
    { name: "Date of Birth", key: "DOB" },
    { name: "Course Enrollment", key: "CE" },
    { name: "Cohort", key: "C" },
    { name: "Guardian", key: "GUARD" },
    { name: "Contact Info", key: "E" },
    { name: "Ambitions", key: "E" },
    { name: "Skills", key: "E" },
    { name: "Interest", key: "E" },
    { name: "Educational Background", key: "E" },

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
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
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
    </div>
  );
};

export default Createroute1;
