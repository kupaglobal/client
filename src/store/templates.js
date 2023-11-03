import { createContext, useReducer } from "react";
import { SET_TEMPLATES } from "./actions";

const initialState = {
  templates: []
};

const templatesStore = createContext(initialState);
const { Provider } = templatesStore;


const TemplateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_TEMPLATES:
        return { ...state, templates: action.payload };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { templatesStore, TemplateProvider };