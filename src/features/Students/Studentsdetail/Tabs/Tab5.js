import React, { useContext, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { authStore } from "../../../../store/auth";
import { cleanedDateStr } from "../../../../utils/moment";

const Tab3 = ({ student }) => {
  const {state: authState} = useContext(authStore)
  
  const facilitatorNameBody = (row) => {
    return `${row.facilitator.firstName} ${row.facilitator.lastName}${authState.loggedInUser.id === row.facilitator.id ? ' (You)' : ''}`
  }

  const ratingBody = (row) => {
    return (
      <span className={`pi pi-${row.rating.toLowerCase().replace('_', '-')}`}></span>
    )
  }
  
  const dateBody = (row) => {
    return cleanedDateStr(row.createdAt)
  }

  const createColumns = (type) => {
    const commonColumns = [
      // { field: "Level", header: "Level" },
      // { field: "Subject", header: "Subject" },
      { field: "facilitator", header: "Facilitator", sortable: true, body: facilitatorNameBody },
      { field: "feedback", header: "Rating", body: ratingBody },
      { field: "remarks", header: "Remarks" },
      { field: "createdAt", header: "Date", sortable: true, body: dateBody },
    ];

    return commonColumns;
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
  
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <div className="card">
          <DataTable
            value={student.feedback}
            removableSort
            paginator
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="No data found."
            selectionMode="single"
            scrollable
          >
            {createColumns("Student Scores", initialProductsStudentScores).map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                body={col.body}
                header={col.header}
                sortable={col.sortable}
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
