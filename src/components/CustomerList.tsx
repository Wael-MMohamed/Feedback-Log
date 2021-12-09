import React from "react";
import { useCustomerList } from './app/GlobalState';
import { v4 as uuidv4 } from 'uuid';



type Props = {
    customers : string[]
}

const CustomrList = (props : Props) => {

    const { state, dispatch } = useCustomerList();


    return (
        <div>
            this is the customer list
            <ul>
                {toggleInput === false ? null : 
                (
                    <ListItem className={classes.head}>
                        <TextField 
                            id="standard-basic" 
                            type='text'
                            placeholder="Add customer name"
                            value={newCustomerName}
                            onChange={handleChange}
                            onBlur={hideInput}
                            onKeyUp={(e) => {
                                if(e.key === "Enter")
                                    saveName()
                                if(e.key === "Escape")
                                    hideInput()
                            }}
                        />
                    </ListItem>
                )}
                {state.map((item) => {
                    return (item.id === 0 ?  null : <ListItem button key={item.id} selected={selectedIndex === item.id} onClick={() => showFeedback(item.id)}>
                                                        <ListItemText primary={item.name} />
                                                    </ListItem>)
                })}
            </ul>
        </div>
    )
}


export default CustomrList;