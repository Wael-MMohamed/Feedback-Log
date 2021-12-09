import React, { createContext, ReactNode, useContext, useReducer } from "react";


export type State = {
        id: number,
        name: string,
        feedback: string[]
    }[]


const defaultState: State = [{id: 0, name: '', feedback: ['']}]; 


export type Action = {
    type: "ADD_NEW_CUSTOMER" | "ADD_NEW_FEEDBACK"
    payload: {id: number, name?: string, feedback?: string }
}

type Dispatch = (action : Action) => void

const updateFeedback = (id: number,feedback: string, state : State): State =>{
    const index : number = state.findIndex(item => item.id === id);
    if(state[index].feedback){
    state[index].feedback.push(feedback)
    }
    return state;
}

const appReducer = (state : State, action : Action): State => {
    switch(action.type){
        case "ADD_NEW_CUSTOMER":
            return  [...state, {id: action.payload.id, name: action.payload.name || '', feedback: []}];
        case "ADD_NEW_FEEDBACK":
                return updateFeedback(action.payload.id, action.payload.feedback || '', state);
    }
}

export const GlobalContext = createContext<{state: State, dispatch : Dispatch}| undefined>(undefined);


export const GlobalProvider= ({children}: {children : ReactNode}) => {

    const [state, dispatch] = useReducer(appReducer,defaultState);

    //actions
    const addNewCustomer = (id: number,name: string) => {
        dispatch({type:"ADD_NEW_CUSTOMER", payload: {id ,name}});
    }

    const addNewFeedback = (id: number, feedback: string) => {
        dispatch({type: "ADD_NEW_FEEDBACK", payload: {id, feedback}})
    }

    return(
        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useCustomerList = () => {
    const context = useContext(GlobalContext);
    if(!context) throw new Error('useCustomerList must be used inside a contextProvider');
    return context;
}