import React from "react";
import "./card.css";
import MeatballMenu from "../MeatballMenu";
import { cleanedDateStr } from "../../utils/moment";


const ListCohortCard = ({cohort, options, setSelectedCohort}) => {
    const handleClick = () =>{
        setSelectedCohort(cohort)
    }
  return (
    <>
      <div className="horizontal-card w-auto" onClick={handleClick}   >
        <div className="frame">
          <div className="div">{cohort.name}</div>
        </div>
        <div className="frame-2 ">
          <div className="div">{cleanedDateStr(cohort.startDate)} - {cleanedDateStr(cohort.endDate)}</div>
        </div>
        <div>
            <MeatballMenu options={options} />
        </div>
      </div>
    </>
  );
};
ListCohortCard.defaultProps = {
    studentname1: "Default Student 1",
    studentname2: "Default Student 2",
    studentname3: "Default Student 3",
    cohortname: "Default Cohort",
    cohortnumber: "Default Cohort",
  };


export default ListCohortCard;
