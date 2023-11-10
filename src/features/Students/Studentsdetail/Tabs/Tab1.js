import React from "react";
import { MdAutoGraph } from "react-icons/md";
import { HiOutlineHeart } from "react-icons/hi";
import { Tag } from "primereact/tag";
import { Accordion, AccordionTab } from "primereact/accordion";
import DetailsContent from "../../../../components/DetailsContent";

const Tab1 = ({ student }) => {
  const userDetails = [
    { heading: "Student Email", paragraph: student.email },
    { heading: "Student Phone", paragraph: student.phone },
    { heading: "Highest Qualification Level", paragraph: student.highestQualificationLevel },
    { heading: "Expected Graduation", paragraph: "N/A" },
    { heading: "Guardian Name", paragraph: student.guardianName },
    { heading: "Guardian Email", paragraph: student.guardianEmail },
    { heading: "Guardian Relation", paragraph: student.guardianRelationship },
    { heading: "Guardian Whatsapp", paragraph: student.guardianWhatsapp },
  ];

  return (
    <div>
      <div className="flex__container">
        {userDetails.map((detail, index) => (
          <DetailsContent
            key={index}
            heading={detail.heading}
            paragraph={detail.paragraph}
          />
        ))}
      </div>

      <div>
        <Accordion multiple activeIndex={[0]}>
          <AccordionTab
            headerClassName="custom-accordion-header"
            header={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <MdAutoGraph size={18} />
                  <span style={{ paddingLeft: "10px" }}>Career Aspirations ({student.careerAmbition.length})</span>
                </div>
              </div>
            }
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
            </p>
            {student.careerAmbition.map(ambition => <Tag rounded className="custom-accordion-content" severity="success">{ambition}</Tag> )}
          </AccordionTab>
          {/* <AccordionTab
            headerClassName="custom-accordion-header"
            header={
              <div>
                <HiOutlineBriefcase size={18} />

                <span style={{ paddingLeft: "10px" }}>Goals</span>
              </div>
            }
          >
            <Splitter style={{ height: "250px" }}>
              <SplitterPanel className="splitter">
                <p className="splitter__heading">Long Term Goals</p>
                <div className="splitter__content">
                  <p className="splitter__text">
                    <i className="pi pi-check text__icon" /> Improve
                    standardized test scores
                  </p>
                  <p className="splitter__text">
                    <i className="pi pi-check text__icon" />
                    Secure scholarships or financial aid for college
                  </p>
                  <p className="splitter__text">
                    <i className="pi pi-check text__icon" />
                    Gain meaningful volunteer or work experience
                  </p>
                </div>
              </SplitterPanel>
              <SplitterPanel className="splitter">
                <p className="splitter__heading">Short Term Goals</p>
                <div className="splitter__content">
                  <p className="splitter__text">
                    <i className="pi pi-check text__icon" />
                    Maintain a high GPA this semester
                  </p>
                  <p className="splitter__text">
                    <i className="pi pi-check text__icon" />
                    Participate in extracurricular activities
                  </p>
                  <p className="splitter__text">
                    <i className="pi pi-check text__icon" />
                    Research universities and programs
                  </p>
                </div>
              </SplitterPanel>
            </Splitter>
          </AccordionTab> */}
          <AccordionTab
            headerClassName="custom-accordion-header"
            header={
              <div>
                <HiOutlineHeart size={18} />

                <span style={{ paddingLeft: "10px" }}>Interests ({student.interests.length})</span>
              </div>
            }
          >
            {student.interests.map(interest => <Tag rounded className="custom-accordion-content">{interest}</Tag>)}
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default Tab1;
