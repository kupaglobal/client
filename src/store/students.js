import { createContext, useReducer } from "react";
import { RELOAD, SET_STUDENTS, SET_STUDENT_FIELDS, SHOW_ADD_STUDENTS_POPUP, SHOW_ERRORED_STUDENTS_POPUP, HIDE_ERRORED_STUDENTS_POPUP, SET_SELECTED_STUDENTS } from "./actions";

const initialState = {
  students: [],
  studentFields: [],
  erroredStudents: [],
  showAddStudentsPopup: false,
  showErroredStudentsPopup: false,
  reloadStudents: false,
  erroredStudentsMessage: '',
  selectedStudents: []
};

const studentsStore = createContext(initialState);
const { Provider } = studentsStore;

const StudentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_STUDENTS:
        return { ...state, students: action.payload };
      case SET_STUDENT_FIELDS:
        return { ...state, studentFields: action.payload };
      case SHOW_ADD_STUDENTS_POPUP:
        return { ...state, showAddStudentsPopup: action.payload };
      case SHOW_ERRORED_STUDENTS_POPUP:
        return { ...state, erroredStudents: action.payload.erroredStudents, erroredStudentsMessage: action.payload.message, showErroredStudentsPopup: true };
      case HIDE_ERRORED_STUDENTS_POPUP:
        return { ...state, erroredStudents: [], showErroredStudentsPopup: false };
      case SET_SELECTED_STUDENTS:
        return { ...state, selectedStudents: action.payload };
      case RELOAD: 
        return { ...state, reloadStudents: action.payload }
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { studentsStore, StudentsProvider };