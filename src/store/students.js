import { createContext, useReducer } from "react";
import { SET_STUDENTS, SET_STUDENT_FIELDS } from "./actions";

const initialState = {
  students: [],
  studentFields: []
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
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { studentsStore, StudentsProvider };