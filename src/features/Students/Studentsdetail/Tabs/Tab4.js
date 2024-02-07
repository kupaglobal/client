import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import React, { useContext, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Verticalcard from "../../../../components/Cards/Verticalcard";
import { StudentsService } from "../../../../services/students.service";
import { toastStore } from "../../../../store/toast";
import NewPortfolioForm from "./NewPortfolioForm";
import EditPortfolioForm from "./EditPortfolioForm";

const MEDIA = "Media"
const CERTIFICATES = "Certificate"
const OTHER_PORTFOLIO_WORKS = "Other"

const defaultFormData = {
  "title": "",
  "category": "",
  "date": "",
  "description": "",
  "type": "",
  "referenceLink": ""
}

const Tab4 = ({ student }) => {
  // Example list of Tab2headings
  const headingsList = [
    {
      Name: MEDIA,
    },
    {
      Name: CERTIFICATES,
    },
    {
      Name: OTHER_PORTFOLIO_WORKS,
    },
    // Add more headings as needed
  ];

  // Example list of Verticalcard items
  // const verticalCardData = {
  //   Media: [
  //     {
  //       title: "Character assessment",
  //       category: "Interview",
  //       date: "21st Aug 2023",
  //       description:
  //         "This document shows the students character assessment certificate",
  //     },
  //     {
  //       title: "Personal Introduction",
  //       category: "Video Introduction",
  //       date: "21st Aug 2023",
  //       description:
  //         "This document shows the students character assessment certificate",
  //     },
  //   ],
  //   Certificates: [
  //     {
  //       title: "Coding V101 Champion",
  //       category: "",
  //       date: "21st Aug 2023",
  //       description:
  //         "This document shows the students character assessment certificate",
  //     },
  //     {
  //       title: "Youth Leadership Award",
  //       category: "",
  //       date: "21st Aug 2023",
  //       description:
  //         "This document shows the students character assessment certificate",
  //     },
  //   ],
  //   "Other portfolio Works": [
  //     {
  //       title: "Program Refletion ",
  //       category: "Project",
  //       date: "21st Aug 2023",
  //       description:
  //         "This document shows the students character assessment certificate",
  //     },
  //     {
  //       title: "Character assessment",
  //       category: "Submission",
  //       date: "21st Aug 2023",
  //       description:
  //         "This document shows the students character assessment certificate",
  //     },
  //   ],
  // };

  const [verticalCardData, setVerticalCardData] = useState({
    [MEDIA]: [],
    [CERTIFICATES]: [],
    [OTHER_PORTFOLIO_WORKS]: []
  })

  const [refetchPortfolio, setRefetchPortfolio] = useState(true)
  useEffect(() => {
    async function fetchStudentPortfolio() {
      const {data: response} = await StudentsService.getStudentPortfolio(student.id)
          
      setVerticalCardData({
        [MEDIA]: response.portfolio.filter(portfolio => portfolio.type === MEDIA),
        [CERTIFICATES]: response.portfolio.filter(portfolio => portfolio.type === CERTIFICATES),
        [OTHER_PORTFOLIO_WORKS]: response.portfolio.filter(portfolio => portfolio.type === OTHER_PORTFOLIO_WORKS),
      })
      setRefetchPortfolio(false)
    }

    if (refetchPortfolio) {
      fetchStudentPortfolio()
    }
  }, [refetchPortfolio, student.id])

  const [isLoading, setIsLoading] = useState(false)

  function showNewPortfolio(name) {
    if (name === MEDIA) {
      setShowNewMediaPortfolio(true)
    } else if (name === CERTIFICATES) {
      setShowNewCertificatesPortfolio(true)
    } else if (name === OTHER_PORTFOLIO_WORKS) {
      setShowNewOtherPortfolio(true)
    }
  }

  function showEditPortfolio(name) {
    if (name === MEDIA) {
      setShowEditMediaPortfolio(true)
    } else if (name === CERTIFICATES) {
      setShowEditCertificatesPortfolio(true)
    } else if (name === OTHER_PORTFOLIO_WORKS) {
      setShowEditOtherPortfolio(true)
    }
  }

  const [showNewMediaPortfolio, setShowNewMediaPortfolio] = useState(false)
  const [showNewCertificatesPortfolio, setShowNewCertificatesPortfolio] = useState(false)
  const [showNewOtherPortfolio, setShowNewOtherPortfolio] = useState(false)

  const [showEditMediaPortfolio, setShowEditMediaPortfolio] = useState(false)
  const [showEditCertificatesPortfolio, setShowEditCertificatesPortfolio] = useState(false)
  const [showEditOtherPortfolio, setShowEditOtherPortfolio] = useState(false)

  const [formData,setFormData]=useState(defaultFormData)
  const [currentPortfolioId, setCurrentPortfolioId] = useState("")

  const goTo = useNavigate()
  const toast = useContext(toastStore)
  async function saveNewPortfolio() {
    setIsLoading(true)

    try {
      await StudentsService.addStudentPortfolioItem(student.id, formData)
      goTo(`/students/${student.id}?selectedTab=achievements`)
      setShowNewMediaPortfolio(false)
      setShowNewCertificatesPortfolio(false)
      setShowNewOtherPortfolio(false)
      setRefetchPortfolio(true)
      setIsLoading(false)
      setFormData(defaultFormData)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }
  }

  async function savePortfolio() {
    setIsLoading(true)

    try {
      await StudentsService.editStudentPortfolioItem(student.id, currentPortfolioId, formData)
      goTo(`/students/${student.id}?selectedTab=portfolio`)
      setShowEditMediaPortfolio(false)
      setShowEditCertificatesPortfolio(false)
      setShowEditOtherPortfolio(false)
      setRefetchPortfolio(true)
      setIsLoading(false)
      setFormData(defaultFormData)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
      setIsLoading(false)
    }
  }

  function dialogOnHide() {
    setShowNewMediaPortfolio(false)
    setShowNewCertificatesPortfolio(false)
    setShowNewOtherPortfolio(false)

    setShowEditMediaPortfolio(false)
    setShowEditCertificatesPortfolio(false)
    setShowEditOtherPortfolio(false)
  }

  function handleEmit({ type, payload }) {
    if (type === 'edit') {
      setCurrentPortfolioId(payload.id)
      setFormData({
        ...payload      
      })
      showEditPortfolio(payload.type)
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

  const showType = showNewMediaPortfolio ? MEDIA : (showNewCertificatesPortfolio ? CERTIFICATES : OTHER_PORTFOLIO_WORKS)
  const editType = showEditMediaPortfolio ? MEDIA : (showEditCertificatesPortfolio ? CERTIFICATES : OTHER_PORTFOLIO_WORKS)
  return (
    <>
      <Dialog
        header={`New Portfolio for ${student.firstName} ${student.lastName}`}
        visible={showNewMediaPortfolio || showNewCertificatesPortfolio || showNewOtherPortfolio}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={dialogOnHide}
        footer={footerContent}
      > 
        <div> 
          <NewPortfolioForm
            formData={formData}
            setFormData={setFormData}
            type={showType}
            saveNewPortfolio={saveNewPortfolio}
            isLoading={isLoading}
          />
        </div>
      </Dialog>

      <Dialog
        header={`Edit ${editType} Portfolio for ${student.firstName} ${student.lastName}`}
        visible={showEditMediaPortfolio || showEditCertificatesPortfolio || showEditOtherPortfolio}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={dialogOnHide}
        footer={footerContent}
      > 
        <div> 
          <EditPortfolioForm
            formData={formData}
            setFormData={setFormData}
            type={editType}
            savePortfolio={savePortfolio}
            isLoading={isLoading}
          />
        </div>
      </Dialog>

      <div className="uploadelements">
        {headingsList.map((heading, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}>
            <Tab4headings Name={heading.Name} showNewPortfolio={showNewPortfolio} />
            <div style={{ display: "flex", gap: "20px" }}>
              {verticalCardData[heading.Name].map((item, itemIndex) => (
                <Verticalcard
                  id={item.id}
                  key={itemIndex} 
                  title={item.title}
                  category={item.category}
                  date={item.date}
                  description={item.description || '-'}
                  referenceLink={item.referenceLink}
                  type={item.type}
                  onEmit={handleEmit}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const Tab4headings = ({ Name, showNewPortfolio }) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 15, fontWeight: 800, marginBottom: "8px" }}>
          {Name}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
        <Button icon={<BsPlus size={24} />} onClick={() => showNewPortfolio(Name)} outlined className="p-button-rounded" />
          {/* <Button  icon={<BsPencil />} outlined className="p-button-rounded" /> */}
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Tab4;
