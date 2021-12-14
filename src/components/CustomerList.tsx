import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useCustomerList } from '../app/GlobalState';



type Props = {
    toggleInput : boolean
    selectedIndex : string
    hideInput() : void
    showFeedback(id: string) : void
    setSelectedIndex(id : string) : void
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
            dispatch({type:"ADD_NEW_CUSTOMER",payload:{id: uuidv4(), name: newCustomerName, feedback: ''}})
            props.hideInput()
            props.setSelectedIndex('0')
            setNewCustomerName('')
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
                            onBlur={() => 
                                {setNewCustomerName('');
                                props.hideInput()}
                                
                            }
                            onKeyUp={(e) => {
                                if(e.key === "Enter")
                                    saveName()
                                if(e.key === "Escape"){
                                    props.hideInput()
                                    setNewCustomerName('');
                                }
                            }}
                        />
                    </li>
                )}
            
                {state.map((item) => {
                    return (item.id === '0' ?  null : <li  key={item.id} 
                                                        className={props.selectedIndex === item.id ? 'shaded' : 'none'}
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