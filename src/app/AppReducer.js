import { v4 as uuidv4 } from 'uuid';


 const appReducer = (state, action) => {
    switch(action.type){
        case "ADD_NEW_CUSTOMER":
            return{
                ...state,
                customerList: [ ...state.customerList, {id:uuidv4(), name: action.payload} ]
            }
        case "ADD_NEW_FEEDBACK":
            return{
                ...state,
                feedbackList: [...state.feedbackList, {id:uuidv4(), customer_id: action.payload.id, feedback: action.payload.feedback}]
            }
        default:
            return state;
    }
}

export default appReducer