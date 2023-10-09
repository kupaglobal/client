import { createContext, useReducer } from "react";
import { SET_TOAST } from "./actions";
const initialState = {
    severity: '',
    message: ''
};

const toastStore = createContext(initialState);
console.log(toastStore)
const { Provider } = toastStore;
const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_TOAST:
        return { ...state, severity: action.payload.severity, message: action.payload.message };
      default:
        throw new Error();
    }
  }, initialState);
    const toast = (severity, message) => {
        if (!severity) {
            dispatch({ type: SET_TOAST, payload: { severity: null, message: null }})
        } else {
            dispatch({ type: SET_TOAST, payload: { severity, message }})
        }
    }
  return <Provider value={{ state, dispatch, toast }}>{children}</Provider>;
};



export { toastStore, ToastProvider };