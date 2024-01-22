import { createContext, useReducer } from "react";
import { RELOAD, SET_ORGANISATION_MEMBERS } from "./actions";

const initialState = {
  members: [],
  reloadMembers: false,
};

const organisationStore = createContext(initialState);
const { Provider } = organisationStore;

const OrganisationProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_ORGANISATION_MEMBERS:
        return { ...state, members: action.payload };
      case RELOAD:
        return { ...state, reloadMembers: action.payload }
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { organisationStore, OrganisationProvider };