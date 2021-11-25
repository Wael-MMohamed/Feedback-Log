import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";


const initialState = {
    customerList: [],
    feedbackList: []
}



export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    const addNewCustomer = (name) => {
        dispatch({type:"ADD_NEW_CUSTOMER", payload: name});
    }

    const addNewFeedback = (id, feedback) => {
        dispatch({type: "ADD_NEW_FEEDBACK", payload: {id, feedback}})
    }

    return(
        <GlobalContext.Provider value={{
            customerList: state.customerList,
            feedbackList: state.feedbackList,
            addNewCustomer,
            addNewFeedback
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}