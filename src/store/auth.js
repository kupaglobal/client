import { createContext, useReducer } from "react";
import { SET_LOGGED_IN_USER } from "./actions";
const cleanUser = (user) => {
    user.fullName = (user.firstName && user.lastName) ? user.fullName = `${user.firstName} ${user.lastName}` : null
    return user
}
const loggedInUser = localStorage.getItem('loggedInUser') ? cleanUser(JSON.parse(localStorage.getItem('loggedInUser'))) : null
const initialState = {
    loggedInUser
};

const authStore = createContext(initialState);
const { Provider } = authStore;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_LOGGED_IN_USER:
        localStorage.setItem('loggedInUser', JSON.stringify(cleanUser(action.payload)))
        return { ...state, loggedInUser: action.payload };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authStore, AuthProvider };