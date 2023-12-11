import React, { useState } from "react";
import "./table.css";
import DataTable from "react-data-table-component";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import FilterOptions from "./FilterOptions";

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
      backgroundColor: "var(--primary-color)",
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
  // filter,
  // setFilter,
  // setFilteredGroups,
  // setFilteredSessions,
  tableRowItem,
  popupContent = null,
  hideSearch = false,
  filterOptions = [],
  onFilter,
  isLoading = false,
  handleSelectedRowsChanged = () => {}
}) => {
  const navigate = useNavigate();
  // const [selectedRows, setSelectedRows] = useState([]); // Add this line

  const handleRowClick = (row) => {
    navigate(`/${tableRowItem}/${row.id}`);
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
  // const handleRowSelected = (rows) => {
  //   // Add this function
  // };

  const contextActions = React.useMemo(() => {
		const handleDelete = () => {
		};

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</Button>
		);
	}, []);


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
          {!hideSearch ?
          <>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />
            <span className="search-icon">
              <MdOutlineSearch />
            </span>
          </>
          : ''}
        </div>
        <div style={{ alignSelf: "center"}}>
          {popupContent ? popupContent : null}
        </div>
      </div>

      <div>
        {
          filterOptions !== null ?
          <FilterOptions filterOptions={filterOptions} onFilter={onFilter} isLoading={isLoading} /> : null
        }
      </div>
      <DataTable
        columns={columns}
        data={searchText.length > 0 ? filteredData : data}
        onRowClicked={handleRowClick}
        pagination
        highlightOnHover
        contextActions={contextActions}
        selectableRows // Enable selection
        onSelectedRowsChange={handleSelectedRowsChanged}
        customStyles={customStyles}
      />
    </div>
  );
};

export default Table;
