import { createContext, useReducer } from "react";
import { SET_TEMPLATES, SET_ACTIVE_TEMPLATE } from "./actions";

const initialState = {
  templates: [],
  activeTemplate: {
    fields: []
  },
};

const templatesStore = createContext(initialState);
const { Provider } = templatesStore;


const TemplatesProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_TEMPLATES:
        return { ...state, templates: action.payload };
      case SET_ACTIVE_TEMPLATE:
        return { ...state, activeTemplate: action.payload };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { templatesStore, TemplatesProvider };