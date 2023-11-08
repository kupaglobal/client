import { createContext, useReducer } from "react";
import { RELOAD, SET_STUDENTS, SET_STUDENT_FIELDS, SHOW_ADD_STUDENTS_POPUP } from "./actions";

const initialState = {
  students: [],
  studentFields: [],
  showAddStudentsPopup: false,
  reloadStudents: false
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
      case RELOAD: 
        return { ...state, reloadStudents: action.payload }
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { studentsStore, StudentsProvider };