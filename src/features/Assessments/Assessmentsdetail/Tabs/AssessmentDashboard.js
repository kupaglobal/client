import React from "react";
import { MdAutoGraph } from "react-icons/md";
import { HiOutlineHeart } from "react-icons/hi";
import { Tag } from "primereact/tag";
import { Accordion, AccordionTab } from "primereact/accordion";
import DetailsContent from "../../../../components/DetailsContent";

const AssessmentDashboard = ({ assessment }) => {
  const userDetails = [
    { heading: `Highest ${assessment.type}`, paragraph: 70 },
    { heading: `Lowest ${assessment.type}`, paragraph: 10 },
    { heading: `Average ${assessment.type}`, paragraph: 35 },
    { heading: "Highest Student", paragraph: "Bukayo Saka" },
    { heading: "Lowest Student", paragraph: "David De Gea" },
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
                  <span style={{ paddingLeft: "10px" }}>General Glance</span>
                </div>
              </div>
            }
          >
            {/* {graphHere} */}
          </AccordionTab>
          <AccordionTab
            headerClassName="custom-accordion-header"
            header={
              <div>
                <HiOutlineHeart size={18} />

                <span style={{ paddingLeft: "10px" }}>Performance By Gender</span>
              </div>
            }
          >
            {/* {graphHere} */}
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
