import { createContext, useReducer } from "react";
import { RELOAD, SET_ASSESSMENT_FILTER_OPTIONS, SET_CURRENT_ASSESSMENT, SET_CURRENT_ASSESSMENT_RESULTS } from "./actions";

const initialState = {
  assessments: [],
  studentFields: [],
  erroredResults: [],
  showAddResultsPopup: false,
  showErroredResultsPopup: false,
  reloadAssessments: false,
  erroredResultsMessage: '',
  selectedResults: [],
  currentAssessment: null,
  selectedFilterOptions: [],
  currentAssessmentResults: {
    results: [],
    pagination: {
      page: 1, 
      limit: 10
    },
    filterOptions: []
  },
};

const assessmentsStore = createContext(initialState);
const { Provider } = assessmentsStore;

const AssessmentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_CURRENT_ASSESSMENT:
        return { ...state, currentAssessment: action.payload };
      case SET_CURRENT_ASSESSMENT_RESULTS:
        return { ...state, currentAssessmentResults: action.payload };
      case SET_ASSESSMENT_FILTER_OPTIONS:
        return { ...state, selectedFilterOptions: action.payload };
        case RELOAD:
        return { ...state, reloadAssessments: action.payload }
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { assessmentsStore, AssessmentsProvider };