import { createContext, useReducer } from "react";
import { SET_LOGGED_IN_USER } from "./actions";
const cleanUser = (user) => {
    user.fullName = (user.firstName && user.lastName) ? user.fullName = `${user.firstName} ${user.lastName}` : null
    return user
}
const loggedInUser = localStorage.getItem('loggedInUser') ? cleanUser(JSON.parse(localStorage.getItem('loggedInUser'))) : null
const token = localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : null
const getToken = () => localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : null
console.log('token', token)
const initialState = {
  loggedInUser,
  token,
  getToken
};

const authStore = createContext(initialState);
const { Provider } = authStore;

const setLoggedInUser = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(cleanUser(user)))
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_LOGGED_IN_USER:
        setLoggedInUser(action.payload)
        return { ...state, loggedInUser: action.payload };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authStore, AuthProvider };