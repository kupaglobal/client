import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { BsTrophyFill } from "react-icons/bs";
import { Divider } from "primereact/divider";
import { BsPlus } from "react-icons/bs";
import { Button } from "primereact/button";
import { StudentsService } from "../../../../services/students.service";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import { toastStore } from "../../../../store/toast";
import NewAchievementForm from "./NewAchievement";
import { cleanedDateStr } from "../../../../utils/moment";



const Tab2 = ({ student }) => {
  const achievementTypes = {
    PROGRAM: 'Program',
    INTERNSHIP: 'Internship',
    SCHOLARSHIP: 'Scholarship',
    OTHER: 'Other'
  }

  const [achievements, setAchievements] = useState({
    PROGRAM: [],
    INTERNSHIP: [],
    SCHOLARSHIP: [],
    OTHER: []
  })

  const [isLoading, setIsLoading] = useState(false)
  const goTo = useNavigate()
  const { toast } = useContext(toastStore);
  const [refetchAchievements, setRefetchAchievements] = useState(true)

  useEffect(() => {
    async function getStudentAchievements() {
      const { data: studentAchievementsRes } = await StudentsService.getStudentAchievements(student.id)
      let achievementsByType = {}
      Object.keys(achievementTypes).forEach(achievementType => {
        achievementsByType[achievementType.toUpperCase()] = studentAchievementsRes.achievements.filter(achievement => achievement.type.toUpperCase() === achievementType)
      })
      setAchievements(achievementsByType)
      console.log('achievements',achievements, achievementsByType)
      // loop through achievementTypes and then fill achievements
      setRefetchAchievements(false)
    }
    if (refetchAchievements) {
      getStudentAchievements()
    }
  })

  function showNewAchievement(name) {
    setSelectedAchievementType(name)
  }

  const [selectedAchievementType, setSelectedAchievementType] = useState(null)
  const [formData,setFormData]=useState({
    "name": "",
    "date": "",
    "description": "",
    "skillGained": "",
    "skillsGained": [],
    "referenceLink": "",
    "type": ""
  })

  async function saveNewAchievement() {
    setIsLoading(true)

    formData.skillsGained = formData.skillGained.split(",").map(skill => skill.trim())

    try {
      await StudentsService.addStudentAchievement(student.id, formData)
      setSelectedAchievementType(null)
      setRefetchAchievements(true)
      setIsLoading(false)
      setFormData({
        "name": "",
        "date": "",
        "description": "",
        "skillGained": "",
        "skillsGained": [],
        "referenceLink": "",
        "type": ""
      })
      goTo(`/students/${student.id}?selectedTab=achievements`)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
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
    </div>
  );

  return (
    <>
      <Dialog
        header={`New ${selectedAchievementType} Achievement for ${student.firstName} ${student.lastName}`}
        visible={selectedAchievementType}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => { setSelectedAchievementType(null) }}
        footer={footerContent}
      > 
        <div> 
          <NewAchievementForm
            type={selectedAchievementType}
            formData={formData}
            setFormData={setFormData}
            saveNewAchievement={saveNewAchievement}
            isLoading={isLoading}
          />
        </div>
      </Dialog>
      {Object.keys(achievementTypes).map(achievementType => ((
        <div>
          <Tab2headings Name={achievementTypes[achievementType]} showNewAchievement={showNewAchievement}/>  

          {achievements[achievementType].map((achievement, index) => ((
            <Tab2containers key={index} achievement={achievement} />
          )))}
        </div>
      )))}
    </>
  );
};

export default Tab2;

export const Tab2containers = ({ achievement }) => {
  //console.log('in container', achievement)
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="achieve__container">
        <div className="image__container">
          <Avatar
            icon={<BsTrophyFill />}
            size="xlarge"
            style={{ backgroundColor: "var(--secondary-color)", color: "#fff" }}
          />
        </div>
        <div>
          <p
            style={{
              color: "#8a92a6",
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 5,
            }}
          >
            {achievement.name} {achievement.referenceLink ? 
                      <Link
                      icon
                      target="_blank"
                      className="p-button-outlined p-button-sm"
                      to={achievement.referenceLink}
                    >(Link)</Link>
          
             : null}
          </p>
          <p style={{ marginBottom: "1rem", fontSize: 13, color: "#cccccc" }}>
            {cleanedDateStr(achievement.date)}
          </p>
          <p>
            {achievement.description}
          </p>
        </div>
      </div>

      <div className="achieve__section-bottom">
        <div className="flex flex-row justify-content-center align-items-center">
          <BsTrophyFill size={22} color="#8a92a6" />{" "}
          <span
            style={{ color: "#8a92a6", marginLeft: "5px", fontWeight: 600 }}
          >
            Skills Gained
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {achievement.skillsGained.map((skill, index) => (
            <p key={index} className="bottom-text">{skill}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Tab2headings = ({ Name, showNewAchievement }) => {

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 15, fontWeight: 800, marginBottom: "8px" }}>
          {Name}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
        <Button icon={<BsPlus size={24} />} onClick={() => showNewAchievement(Name)} outlined className="p-button-rounded" />
          {/* <Button  icon={<BsPencil />} outlined className="p-button-rounded" /> */}
        </div>
      </div>
      <Divider />
    </>
  );
};

