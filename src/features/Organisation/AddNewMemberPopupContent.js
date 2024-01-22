import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { toastStore } from "../../store/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ucFirst } from "../../utils";
import OrganisationService from "../../services/organisation.service";
import { authStore } from "../../store/auth";
export default function AddNewMemberPopupContent() {
  const {state: authState} = useContext(authStore)
  console.log('authState', authState)
  const [visible, setVisible] = useState(false);

  const [formData,setFormData] = useState({
    invitedEmail: "",
    role: ""
  })

  const { toast } = useContext(toastStore);
  const [selectedRole, setSelectedRole] = useState(null)

  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const [reloadRoles, setReloadRoles] = useState(true)
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      if (selectedRole) {
        setLoading(true)
        formData.role = selectedRole.toUpperCase().replace(" ", "_")
        const {data} = await OrganisationService.sendInvitation(formData)
        if (data) {
          setVisible(false)
          setSelectedRole("")
          toast('success', 'Your invitation has been sent.')
        } else {
          toast('error', 'Failed to send your invitation, please try again.')
        }
        setLoading(false)
      } else {
        toast('error', 'Please select a role for the new member.')
      }
    } catch (e) {
      setLoading(false)
      toast('error', e.response?.data?.error ? e.response?.data?.error : e.message)
    }
  }

  useEffect(() => {
    async function fetchRoles() {
      setReloadRoles(false)
      try {
        const {data: roles} = await OrganisationService.getRoles()
        setRoles(roles.filter(role => !["ADMIN", "USER"].includes(role)).map(role => ucFirst(role.replace("_", " "))))
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    if (reloadRoles) {
      fetchRoles()
    }
  }, [reloadRoles, toast])

  const footerContent = (
    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="custom-button"
        outlined
      />
      <Button
        label="Send Invitation"
        icon="pi pi-envelope"
        onClick={handleSubmit}
        className="custom-button"
        loading={loading}
      />
    </div>
  );

  return (
    <>
      <Button
       visible={authState.loggedInUser.role === "ORGANISATION_ADMIN"}
        outlined
        icon={<AiOutlinePlus />}
        label="Invite New Member"
        className="custom-button"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Invite a new member"
        visible={visible}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="w-full m-auto m-2">
          <form onSubmit={handleSubmit}>
            <label htmlFor="invitedEmail" className="block text-900 font-medium mb-20">Email</label>
            <InputText name="invitedEmail" id="invitedEmail" type="email" placeholder="" className="w-full mb-3" onChange={onChange} required/>

            <label htmlFor="role" className="block text-900 font-medium mb-20">Role</label>
            <Dropdown
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.value)}
              options={roles}
              placeholder="Select a Role"
              className="w-full md:w-14rem mr-2"
            />
          </form>
        </div>
      </Dialog>
    </>
  );
}
