import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { BsTrophyFill } from "react-icons/bs";
import { Divider } from "primereact/divider";
import { BsPlus } from "react-icons/bs";
import { Button } from "primereact/button";
import { StudentsService } from "../../../../services/students.service";
import { Dialog } from "primereact/dialog";
import NewProgramAchievementForm from "../Tabs/NewProgramAchievementForm"
import { useNavigate } from "react-router-dom";
import { toastStore } from "../../../../store/toast";

const Tab2 = ({ student }) => {
  const [ programAchievements, setProgramAchievements ] = useState([]);

  const [ otherAchievements, setOtherAchievements ] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const goTo = useNavigate()
  const { toast } = useContext(toastStore);
  const [refetchAchievements, setRefetchAchievements] = useState(true)

  useEffect(() => {
    async function getStudentAchievements() {
      const { data: studentAchievementsRes } = await StudentsService.getStudentAchievements(student.id)
      setProgramAchievements(studentAchievementsRes.achievements.filter(achievement => achievement.type === "Program")) 
      setOtherAchievements(studentAchievementsRes.achievements.filter(achievement => achievement.type === "Other"))
      setRefetchAchievements(false)
    }
    if (refetchAchievements) {
      getStudentAchievements()
    }
  }, [refetchAchievements, setProgramAchievements, setOtherAchievements, student])

  const [showNewProgramAchievement, setShowNewProgramAchievement] = useState(false)
  const [newProgramAchievementFormData,setFormData]=useState({
    "name": "",
    "date": "",
    "description": "",
    "skillGained": "",
    "skillsGained": [],
    "type": "Program"
  })

  async function saveNewAchievement() {
    setIsLoading(true)

    newProgramAchievementFormData.type = "Program";
    newProgramAchievementFormData.skillsGained = newProgramAchievementFormData.skillGained.split(",").map(skill => skill.trim())

    try {
      await StudentsService.addStudentAchievement(student.id, newProgramAchievementFormData)
      goTo(`/students/${student.id}?selectedTab=achievements`)
      setShowNewProgramAchievement(false)
      setRefetchAchievements(true)
      setIsLoading(false)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }

    try {

    } catch (e) {
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
    <Button
        label="Save"
        icon="pi pi-flag-fill"
        onClick={() => saveNewAchievement("Program")}
        className="custom-button"
        loading={isLoading}
    />
    </div>
  );

  return (
    <>
      <div>

      <Dialog
        header={`New Program Achievement for ${student.firstName} ${student.lastName}`}
        visible={showNewProgramAchievement}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setShowNewProgramAchievement(false)}
        footer={footerContent}
      > 
        <div>
          <NewProgramAchievementForm formData={newProgramAchievementFormData} setFormData={setFormData}/>
        </div>
      </Dialog>


        <Tab2headings Name={'Program Achievements'} setShowNewProgramAchievement={setShowNewProgramAchievement}/>  

        {programAchievements.map((achievement, index) => (
          <Tab2containers key={index} achievement={achievement} />
        ))}
      </div>
      <div>
        <Tab2headings Name={'Other Achievements'} />

        {otherAchievements.map((achievement, index) => (
          <Tab2containers key={index} achievement={achievement} />
        ))}
      </div>
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
            {achievement.name}
          </p>
          <p style={{ marginBottom: "1rem", fontSize: 13, color: "#cccccc" }}>
            {achievement.date}
          </p>
          <p>
            {achievement.description}
          </p>
        </div>
      </div>

      <div className="achieve__section-bottom">
        <div>
          {" "}
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

export const Tab2headings = ({ Name, setShowNewProgramAchievement }) => {

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 15, fontWeight: 800, marginBottom: "8px" }}>
          {Name}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button icon={<BsPlus size={24} />} onClick={() => setShowNewProgramAchievement(true)} outlined className="p-button-rounded" />
          {/* <Button  icon={<BsPencil />} outlined className="p-button-rounded" /> */}
        </div>
      </div>
      <Divider />
    </>
  );
};
