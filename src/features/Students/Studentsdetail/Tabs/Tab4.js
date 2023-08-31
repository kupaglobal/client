import React from "react";
import Verticalcard from "../../../../components/Cards/Verticalcard";
import { Tab2headings } from "./Tab2";

const Tab4 = () => {
  // Example list of Tab2headings
  const headingsList = [
    {
      Name: "Media",
    },
    {
      Name: "Certificates",
    },
    {
      Name: "Other portfolio Works",
    },
    // Add more headings as needed
  ];

  // Example list of Verticalcard items
  const verticalCardData = {
    Media: [
      {
        title: "Character assessment",
        category: "Interview",
        date: "21st Aug 2023",
        description:
          "This document shows the students character assessment certificate",
      },
      {
        title: "Personal Introduction",
        category: "Video Introduction",
        date: "21st Aug 2023",
        description:
          "This document shows the students character assessment certificate",
      },
    ],
    Certificates: [
      {
        title: "Coding V101 Champion",
        category: "",
        date: "21st Aug 2023",
        description:
          "This document shows the students character assessment certificate",
      },
      {
        title: "Youth Leadership Award",
        category: "",
        date: "21st Aug 2023",
        description:
          "This document shows the students character assessment certificate",
      },
    ],
    "Other portfolio Works": [
      {
        title: "Program Refletion ",
        category: "Project",
        date: "21st Aug 2023",
        description:
          "This document shows the students character assessment certificate",
      },
      {
        title: "Character assessment",
        category: "Submission",
        date: "21st Aug 2023",
        description:
          "This document shows the students character assessment certificate",
      },
    ],
  };

  return (
    <>
      <div className="uploadelements">
        {headingsList.map((heading, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}>
            <Tab2headings Name={heading.Name} />
            <div style={{ display: "flex", gap: "20px" }}>
              {verticalCardData[heading.Name].map((item, itemIndex) => (
                <Verticalcard
                  key={itemIndex} 
                  title={item.title}
                  category={item.category}
                  date={item.date}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tab4;
