import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import OrganisationService from "../../services/organisation.service";
import AddNewMemberPopupContent from "./AddNewMemberPopupContent";
import { toastStore } from "../../store/toast";
import { ucFirst } from "../../utils";
import { authStore } from "../../store/auth";

const columns = [
    {
      id: "name",
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}${row.isLoggedInUser ? ' (You)' : ''}`,
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
  const { state: authState } = useContext(authStore);
  const loggedInUser = authState.loggedInUser

  useEffect(() => {
    async function fetchOrganisationMembers() {
      setReloadMembers(false)
      try {
        const {data: membersRes} = await OrganisationService.getOrganisationMembers()
        const members = membersRes.members.map(member => { 
          if (member.id === loggedInUser.id) {
            member.isLoggedInUser = true;
          }
          return {
            ...member,
            isSelected: false
          }
        })
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
