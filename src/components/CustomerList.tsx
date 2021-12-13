import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useCustomerList } from '../app/GlobalState';



type Props = {
    toggleInput : boolean
    selectedIndex : number
    hideInput() : void
    showFeedback(id: number) : void
}


const CustomrList = (props : Props) => {

    const { state, dispatch } = useCustomerList();
    const [newCustomerName, setNewCustomerName] = useState('')

    const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault()
        setNewCustomerName(event.target.value)
    }

    const saveName = () => {
        if(newCustomerName !== ''){
            dispatch({type:"ADD_NEW_CUSTOMER",payload:{id: parseInt(uuidv4()), name: newCustomerName, feedback: ''}})
            props.hideInput()
            // setSelectedIndex(0)
        }
        
    }



    return (
        <div className="customer-list">
            <ul>
                {props.toggleInput === false ? null : 
                (
                    <li>
                        <input 
                            className="input" 
                            type='text'
                            placeholder="Add customer name"
                            value={newCustomerName}
                            onChange={handleChange}
                            onBlur={props.hideInput}
                            onKeyUp={(e) => {
                                if(e.key === "Enter")
                                    saveName()
                                if(e.key === "Escape")
                                    props.hideInput()
                            }}
                        />
                    </li>
                )}
            
                {state.map((item) => {
                    return (item.id === 0 ?  null : <li  key={item.id} 
                                                        // selected={props.selectedIndex === item.id} 
                                                        onClick={() => props.showFeedback(item.id)}
                                                    >
                                                        {item.name}
                                                    </li>)
                })} 
            </ul>
        </div>
    )
}


export default CustomrList;