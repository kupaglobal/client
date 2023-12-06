import { createContext, useReducer } from "react";
import { RELOAD, SET_CURRENT_ASSESSMENT } from "./actions";

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
};

const assessmentsStore = createContext(initialState);
const { Provider } = assessmentsStore;

const AssessmentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_CURRENT_ASSESSMENT:
        return { ...state, currentAssessment: action.payload };
      case RELOAD:
        return { ...state, reloadAssessments: action.payload }
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { assessmentsStore, AssessmentsProvider };