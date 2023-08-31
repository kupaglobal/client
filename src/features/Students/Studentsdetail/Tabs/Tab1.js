import React from "react";
import { MdAutoGraph } from "react-icons/md";
import { HiOutlineBriefcase, HiOutlineHeart } from "react-icons/hi";
import { Tag } from "primereact/tag";
import { Accordion, AccordionTab } from "primereact/accordion";
import DetailsContent from "../../../../components/DetailsContent";
import { Splitter, SplitterPanel } from "primereact/splitter";

const Tab1 = () => {
  const userDetails = [
    { heading: "Student Email", paragraph: "bdavis@gmail.com" },
    { heading: "Student Phone", paragraph: "+123-456-7890" },
    { heading: "Highest Educational Attainment", paragraph: "O-levels (as of 08/2023)" },
    { heading: "Expected Graduation", paragraph: "May 2025" },
    { heading: "Guardian Name", paragraph: "John Davis" },
    { heading: "Guardian Email", paragraph: "johndavis@gmail.com" },
    { heading: "Guardian Relation", paragraph: "Parent" },
    { heading: "Guardian Whatsapp", paragraph: "+123-456-7890" },
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
                  <span style={{ paddingLeft: "10px" }}>Career Aspirations</span>
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
              “ Civil Engineer ”
            </p>
          </AccordionTab>
          <AccordionTab
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
          </AccordionTab>
          <AccordionTab
            headerClassName="custom-accordion-header"
            header={
              <div>
                <HiOutlineHeart size={18} />

                <span style={{ paddingLeft: "10px" }}>Interests</span>
              </div>
            }
          >
            <Tag rounded className="custom-accordion-content">
              Travelling
            </Tag>
            <Tag rounded className="custom-accordion-content">
              Biking
            </Tag>
            <Tag rounded className="custom-accordion-content">
              Photography
            </Tag>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default Tab1;
