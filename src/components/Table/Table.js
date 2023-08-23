import React, { useState } from "react";
import "./table.css";
import DataTable from "react-data-table-component";
import { MdOutlineSearch } from "react-icons/md";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Popupcontent from "../../features/Students/Popup/Popupcontent";
const customStyles = {
  rows: {
    style: {
      minHeight: "50px", // override the row height
      cursor: "pointer",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "var(--chip-color)",
      color: "#fff",
    },
  },
  cells: {
    style: {
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
    },
  },
};


const Table = ({
  columns,
  data,
  filter,
  setFilter,
  setFilteredGroups,
  setFilteredSessions,
  tableRowItem,
}) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]); // Add this line

  const handleRowClick = (row) => {
    navigate(`/${tableRowItem}/id`);
  };
 
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;

    const filteredItems = data.filter((item) => {
      return columns.some((column) => {
        const field = item[column.id];
        if (field === null || field === undefined) {
          return false;
        }
        return field.toString().toLowerCase().includes(value.toLowerCase());
      });
    });

    setFilteredData(filteredItems);

    setSearchText(e.target.value);
  };
  const handleRowSelected = (rows) => {
    // Add this function
  };


  return (
    <div>
      <div
        style={{
          overflow: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
          />
          <span className="search-icon">
            <MdOutlineSearch />
          </span>
        </div>
        <div style={{ alignSelf: "center"}}>
       
          <Popupcontent />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={searchText.length > 0 ? filteredData : data}
        onRowClicked={handleRowClick}
        pagination
        highlightOnHover
        selectableRows // Enable selection
        selectableRowsHighlight
        selectableRowsVisibleOnly
        customStyles={customStyles}
      />
    </div>
  );
};

export default Table;
