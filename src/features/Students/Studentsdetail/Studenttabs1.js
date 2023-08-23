import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import DetailsContent from "../../../components/DetailsContent";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { MdAutoGraph } from "react-icons/md";
import { HiOutlineBriefcase, HiOutlineHeart } from "react-icons/hi";
import { Tag } from "primereact/tag";
import { useState } from "react";

const Studenttabs1 = () => {
  const [value, setValue] = useState([]);

  return (
    <Card style={{ width: "60vw" }}>
      <TabView>
        <TabPanel header="Basic Info" leftIcon="" style={{ fontSize: "14px" }}>
          <div style={{ display: "flex", marginBottom: 30 }}>
            <DetailsContent
              heading={"Date of Birth"}
              paragraph={"12/07/2004"}
            />
            <DetailsContent heading={"Gender"} paragraph={"Female"} />
            <DetailsContent heading={"Guardian"} paragraph={"Peace Ishimwe"} />
            <DetailsContent
              heading={"Contact Info"}
              paragraph={"wekemoyo@gmail.com"}
            />
          </div>
          <div>
            <Accordion multiple activeIndex={[0]}>
              <AccordionTab
                headerClassName="custom-accordion-header"
                header={
                  <div>
                    <MdAutoGraph size={18} />
                    <span style={{ paddingLeft: "10px" }}>Ambitions</span>
                  </div>
                }
              >
                <p style={{textAlign:'center', fontSize: '13px', fontStyle:'italic', fontWeight: 500 }}>
                “I will get a 4.0 GPA this semester.”</p>
              </AccordionTab>
              <AccordionTab
                headerClassName="custom-accordion-header"
                header={
                  <div>
                    <HiOutlineBriefcase size={18} />

                    <span style={{ paddingLeft: "10px" }}>Skills</span>
                  </div>
                }
              >
                <Tag rounded className="custom-accordion-content">
                  Coding
                </Tag>
                <Tag rounded className="custom-accordion-content">
                  {" "}
                  Microsoft
                </Tag>
                <Tag rounded className="custom-accordion-content">
                  Live Painting
                </Tag>
                <Tag rounded className="custom-accordion-content">
                  Copywriting
                </Tag>
              </AccordionTab>
              <AccordionTab
                headerClassName="custom-accordion-header"
                header={
                  <div>
                    <HiOutlineHeart size={18} />

                    <span style={{ paddingLeft: "10px" }}>Interest</span>
                  </div>
                }
              >
                <Tag rounded className="custom-accordion-content">
                  {" "}
                  Travelling
                </Tag>
                <Tag rounded className="custom-accordion-content">
                  {" "}
                  Biking
                </Tag>
                <Tag rounded className="custom-accordion-content">
                  {" "}
                  Photography
                </Tag>
              </AccordionTab>
            </Accordion>
          </div>
        </TabPanel>
        <TabPanel
          header="Statistical Info"
          rightIcon=""
          style={{ fontSize: "14px" }}
        >
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          </p>
        </TabPanel>
      </TabView>
    </Card>
  );
};

export default Studenttabs1;
