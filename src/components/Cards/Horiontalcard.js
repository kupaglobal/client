import React from "react";
import "./card.css";
import MeatballMenu from "../MeatballMenu";



const Horiontalcard = ({studentname1, studentname2, studentname3, groupname, options}) => {
    const handleClick = () =>{
        console.log("new")
    }
  return (
    <>
      <div className="horizontal-card" onClick={handleClick}   >
        <div className="frame">
          <div className="div">{groupname}</div>
        </div>
        <div className="frame-2">
          <div className="frame-3">
            <div className="text-wrapper-2">{studentname1}</div>
            <div className="text-wrapper-2">{studentname2}</div>
            <div className="text-wrapper-2">{studentname3}</div>            <div className="text-wrapper-2">{studentname3}</div>

          </div>

        </div>
        <div>
        <MeatballMenu  options={options} />
</div>
      </div>
    </>
  );
};
Horiontalcard.defaultProps = {
    studentname1: "Default Student 1",
    studentname2: "Default Student 2",
    studentname3: "Default Student 3",
    groupname: "Default Group",
    cohortnumber: "Default Cohort",
  };


export default Horiontalcard;
