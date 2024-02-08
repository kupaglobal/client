// import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import NewOrganisationForm from '../features/Organisation/NewOrganisationForm'
import OrganisationDetail from '../features/Organisation/OrganisationDetail'
import OrganisationTabsContainer from '../features/Organisation/OrganisationTabsContainer'
import TeamMembers from '../features/Organisation/TeamMembers'
import { useContext, useEffect, useState } from "react";
import { authStore } from "../store/auth";
import { AuthService } from "../services/auth.service";
import { SET_LOGGED_IN_USER } from "../store/actions";
import OrganisationService from "../services/organisation.service";
import { toastStore } from "../store/toast";
// const handleButtonClick = (row) => {
//   console.log("Button clicked for row:", row);
// };

// const columns = [
//   {
//     id: "avatar",
//     name: "No.",
//     selector: (row) => row.avatar,
//     sortable: true,
//   },
//   {
//     id: "st_name",
//     name: "Student Name",
//     selector: (row) => row.st_name,
//     sortable: true,
//   },
//   {
//     id: "st_course",
//     name: "Course",
//     selector: (row) => row.st_course,
//     sortable: true,
//   },
//   {
//     id: "st_gender",
//     name: "Gender",
//     selector: (row) => row.st_gender,
//     sortable: true,
//   },
//   {
//     id: "st_class",
//     name: "Cohort #",
//     selector: (row) => row.st_class,
//     sortable: true,
//   },
// ];
// const tableRowItem = "students";

// const rows = [
//   {
//     avatar: "1",
//     st_name: "Bisola Davis",
//     st_course: "English",
//     st_gender: "Female",
//     st_class: "Cohort 3",
//   },
//   {
//     avatar: "1",
//     st_name: "Peace Ishimwe",
//     st_course: "Mathematics",
//     st_gender: "Male",
//     st_class: "Cohort 4",
//   },
//   {
//     avatar: "1",
//     st_name: "Jhohn Ishimwe",
//     st_course: "Science",
//     st_gender: "Female",
//     st_class: "Cohort 3",
//   },
//   {
//     avatar: "1",
//     st_name: "Michael Ishimwe",
//     st_course: "Science",
//     st_gender: "Male",
//     st_class: "Cohort 4",
//   },
//   {
//     avatar: "1",
//     st_name: "Moyosore Weke",
//     st_course: "English",
//     st_gender: "Female",
//     st_class: "Cohort 2",
//   },
// ];


const OrganisationContainer = () => {
  const [newOrganisationFormData,setFormData]=useState({
    "name": "",
    "registrationNumber": "",
    "address": "",
    "city": "",
    "country": "",
    "size": "",
    "numberOfStudents": "",
    "studentsAge": "",
    "type": ""
  })

  const tabs = ['my-organisation', 'team-members']

  const [queryParams] = useSearchParams()
  const index = queryParams.get('a') ? tabs.indexOf(queryParams.get('a')) : 0

  const [loading, setLoading] = useState(false)
  const { toast } = useContext(toastStore);
  const [refetchProfile, setRefetchProfile] = useState(true)
  const saveNewOrganisation = async () => {
    try {
      setLoading(true)
      await OrganisationService.createOrganisation(newOrganisationFormData);
      setLoading(false)
      setVisible(false)
      setRefetchProfile(true)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setLoading(false)
      console.log(e)
    }
  }
  const footerContent = (
  
    <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
    {/* <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="custom-button"
        outlined
    /> */}
    <Button
        label="Save"
        icon="pi pi-building"
        onClick={() => saveNewOrganisation()}
        className="custom-button"
        loading={loading}
    />
    </div>
  );
  
  const goTo = useNavigate()
  const newUser = queryParams.get('new') !== undefined && queryParams.get('new') !== null
  const [visible, setVisible] = useState((newUser) || false)

  const [profile, setProfile] = useState(null)
  const { dispatch } = useContext(authStore);

  useEffect(() => {
    async function fetchProfile() {
      setRefetchProfile(false)
      const {data: profileRes} = await AuthService.getProfile()
      if (!profileRes?.organisationId && !newUser) {
        goTo('/dashboard?welcome')
      } else if (profileRes?.organisation) {
        setProfile(profileRes)
        dispatch({ type: SET_LOGGED_IN_USER, payload: profileRes })
      }
    }
    if (refetchProfile) {
      fetchProfile()
    }
  }, [refetchProfile, dispatch, goTo, newUser])

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <Dialog
        header="New organisation"
        visible={visible}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      > 
        <div>
          <NewOrganisationForm formData={newOrganisationFormData} setFormData={setFormData}/>
        </div>
      </Dialog>
      <TabView activeIndex={index}>
        <TabPanel header="My Organisation" leftIcon="" style={{ fontSize: "14px" }}>
          <div className="flex gap-4">
            {profile?.organisationId ? <OrganisationDetail organisation={profile.organisation}/> : ''} 
            {profile?.role === "ORGANISATION_ADMIN" ? <OrganisationTabsContainer organisation={profile.organisation}/> : ''}
          </div>

        </TabPanel>
        <TabPanel header="Team Members" rightIcon="" style={{ fontSize: "14px" }}>
          <TeamMembers/>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default OrganisationContainer;
