import Table from "../../components/Table/Table";
import AddNewMemberPopupContent from "./AddNewMemberPopupContent";

const columns = [
    {
      id: "name",
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: "email",
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      id: "phone_number",
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      id: "role",
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    }
  ];
  const tableRowItem = "members";
  
  const rows = [
    {
      name: "John Doe",
      email: "jdoe@example.org",
      phone_number: "+263770111222",
      role: "Instructor"
    },
  ];
          
export default function TeamMembersContent() {

  return (
    <>
      <Table columns={columns} data={rows} tableRowItem={tableRowItem} popupContent={<AddNewMemberPopupContent/>} />

    </>
  );
}
