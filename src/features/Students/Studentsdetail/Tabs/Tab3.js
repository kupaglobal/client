import React, { useState } from "react";
import { Tab2headings } from "./Tab2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
const Tab3 = () => {

    const navigate = useNavigate();
  
    const handleRowClick = (row) => {
      navigate(`/assessments`);
    };


  const createColumns = (type, initialData) => {
    const commonColumns = [
      { field: "Level", header: "Level" },
      { field: "Subject", header: "Subject" },
      { field: "Score", header: "Score" },
      { field: "Grade", header: "Grade" },
      { field: "Date", header: "Date" },
    ];

    const specificColumns = type === "Student Scores"
      ? [{ field: "Assessment", header: "Assessment" }]
      : [{ field: "Institution", header: "Institution" }];

    return [...specificColumns, ...commonColumns];
  };

  const initialProductsStudentScores = [
    {
      Assessment: "Math101",
      Level: "Grade 2",
      Subject: "Mathematics",
      Score: 10,
      Grade: "A1 Distinction",
      Date: "1/2/2023",
    },
    {
        Assessment: "Eng101",
        Level: "Grade 2",
        Subject: "English",
        Score: 10,
        Grade: "A1 Distinction",
        Date: "1/2/2023",
    },
  ];

  const initialProductsOtherAssessments = [
    {
      Institution: "Macheke Primary School", // Add the Institution data here
      Level: "Grade 2",
      Subject: "Mathematics",
      Score: '76%',
      Grade: "Distinction ",
      Date: "2/2/2023",
    },
    {
    Institution: "The Makers Club", // Add the Institution data here
      Level: "Grade 2",
      Subject: "Mathematics",
      Score: '86%',
      Grade: "Distinction ",
      Date: "2/8/2023",
    },
  ];
  

  const [products, setProducts] = useState(initialProductsStudentScores);
  const [globalFilter, setGlobalFilter] = useState("");

  const onInputChange = (event) => {
    setGlobalFilter(event.target.value);
  };

  const filterProducts = () => {
    return products.filter(
      (product) =>
        Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(globalFilter.toLowerCase())
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="text"
            value={globalFilter}
            onChange={onInputChange}
            placeholder="Keyword Search"
            style={{ fontSize: "12px" }}
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Tab2headings Name={"Student Scores"} />
        <div className="card">
          <DataTable
            value={filterProducts()}
            removableSort
            paginator
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
            globalFilter={globalFilter}
            header={header}
            emptyMessage="No data found."
            selectionMode="single"
            scrollable
            onRowClick={handleRowClick}
          >
            {createColumns("Student Scores", initialProductsStudentScores).map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable
                style={{ fontSize: "12px" }}
              />
            ))}
          </DataTable>
        </div>
      </div>

      <div>
        <Tab2headings Name={"Assessments from other Institutions"} />
        <div className="card">
          <DataTable
            value={initialProductsOtherAssessments} 
            removableSort
            paginator
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
            globalFilter={globalFilter}
            header={header}
            emptyMessage="No data found."
            selectionMode="single"
            scrollable
          >
            {createColumns("Other Assessments", initialProductsOtherAssessments).map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable
                style={{ fontSize: "12px" }}
              />
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Tab3;
