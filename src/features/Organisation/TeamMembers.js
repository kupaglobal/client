import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import OrganisationService from "../../services/organisation.service";
import AddNewMemberPopupContent from "./AddNewMemberPopupContent";
import { toastStore } from "../../store/toast";
import { ucFirst } from "../../utils";

const columns = [
    {
      id: "name",
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
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
      selector: (row) => row.phoneNumber || "n/a",
      sortable: true,
    },
    {
      id: "role",
      name: "Role",
      selector: (row) => ucFirst(row.role.replace("_", " ")),
      sortable: true,
    }
  ];
  const tableRowItem = "members";
            
export default function TeamMembersContent() {
  const [members, setMembers] = useState([])
  const { toast } = useContext(toastStore);
  const [ reloadMembers, setReloadMembers ] = useState(true)

  useEffect(() => {
    async function fetchOrganisationMembers() {
      setReloadMembers(false)
      try {
        const {data: membersRes} = await OrganisationService.getOrganisationMembers()
        const members = membersRes.members.map(student => ({ ...student, isSelected: false }))
        setMembers(members)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    if (reloadMembers) {
      fetchOrganisationMembers()
    }
  }, [reloadMembers, toast])

  return (
    <>
      <Table columns={columns} data={members} tableRowItem={tableRowItem} popupContent={<AddNewMemberPopupContent/>} />
    </>
  );
}
