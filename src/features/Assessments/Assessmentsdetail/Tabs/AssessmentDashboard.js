import React, { useContext } from "react";
import { MdAutoGraph } from "react-icons/md";
import { HiOutlineHeart } from "react-icons/hi";
import { Accordion, AccordionTab } from "primereact/accordion";
import DetailsContent from "../../../../components/DetailsContent";
import AssessmentGraph from "../AssessmentGraph";
import { assessmentsStore } from "../../../../store/assessments";

const AssessmentDashboard = () => {
  const { state } = useContext(assessmentsStore)
  const assessment = state.currentAssessment
  const currentAssessmentResults = state.currentAssessmentResults.results
  const userDetails = [
    { heading: `Highest ${assessment.type}`, paragraph: `${assessment.stats.highest ?? '--'}${assessment.stats.highest && assessment.type == 'score' ? '%' : ''}`},
    { heading: `Lowest ${assessment.type}`, paragraph: `${assessment.stats.lowest ?? '--'}${assessment.stats.lowest && assessment.type == 'score' ? '%' : ''}` },
    { heading: `Average ${assessment.type}`, paragraph: assessment.stats.average },
    { heading: "Highest Student", paragraph: assessment.highestStudent && assessment.highestStudent.firstName ? `${assessment.highestStudent.firstName} ${assessment.highestStudent.lastName}` : 'n/a' },
    { heading: "Lowest Student", paragraph: assessment.lowestStudent && assessment.lowestStudent.firstName ? `${assessment.lowestStudent.firstName} ${assessment.lowestStudent.lastName}` : 'n/a' },
    { heading: "Total No. Students", paragraph: assessment.studentsCount ? assessment.studentsCount : 'n/a' },
  ];

  const sortScoreResults = (assessmentResults) => {
    const zeroToHalf = assessmentResults.filter(result => result.score < 50).length;
    const halfToThreeQuarter = assessmentResults.filter(result => result.score >= 50 && result.score < 75).length;
    const threeQuarterToHundred = assessmentResults.filter(result => result.score >=75 && result.score <= 100).length;

    return {
        '0-50%': zeroToHalf,
        '50-75%': halfToThreeQuarter,
        '75-100%': threeQuarterToHundred
    }
  }

  const sortGradeResults = (assessmentResults) => {
    const labels = [new Set(...assessmentResults.map(result => result.grade))]
    const results = {}
    labels.forEach(label => {
        results[label] = assessmentResults.filter(result => result.grade === label).length
    })

    return results
  }

  const results = assessment.type === 'score' ? sortScoreResults(currentAssessmentResults) : sortGradeResults(currentAssessmentResults)
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
            <AssessmentGraph results={Object.values(results)} labels={Object.keys(results)} />
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
