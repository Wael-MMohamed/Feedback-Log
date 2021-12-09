import { Container, Grid, Typography, Box, ButtonBase, ButtonGroup, Button, TextField } from '@material-ui/core'
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useCustomerList } from './app/GlobalState';
import { v4 as uuidv4 } from 'uuid';
import CustomrList from './components/CustomerList';

const useStyles = makeStyles({
    root: {
        padding:4,
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    boxs: {
        borderRight:"1px solid black",
        borderLeft:"1px solid black",
        minHeight: 600
    }
})

const Main :React.FC = () => {

    const classes = useStyles();
    const { state, dispatch } = useCustomerList();
    const [newCustomerName, setNewCustomerName] = useState('')
    const [toggleInput, setToggleInput] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [feedbacks, setFeedbacks] = useState('');
    const [search, setSearch] = useState('');
    

    const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault()
        setNewCustomerName(event.target.value)
    }

    const showFeedback = (customerId : number): void => {
        if(selectedIndex !== customerId){
            setSelectedIndex(customerId)
        }
    }

    const saveName = () => {
        if(newCustomerName !== ''){
            dispatch({type:"ADD_NEW_CUSTOMER",payload:{id: parseInt(uuidv4()), name: newCustomerName}})
            hideInput()
            setSelectedIndex(0)
        }
        
    }

    const handleFeedbackChange = (event  : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setFeedbacks(event.target.value);
    }

    const saveFeedback = (id: number) => {
        if(feedbacks !== ''){
            dispatch({type:"ADD_NEW_FEEDBACK", payload: { id,feedback:feedbacks}})
            setFeedbacks('')
        }
        
    }

    function showInput(){
        setToggleInput(true)
    }

    function hideInput(){
        setToggleInput(false)
        setNewCustomerName('')
    }

    return(
        <Container >
            <Box className={classes.root} border={1}>
                <Typography align='left' variant='h3'>
                    Customer Feedback
                </ Typography>
                <Grid container  spacing={1}>
                    <Grid className={classes.head} item xs={6}>
                        <Typography  variant='h5'>
                            Customers
                        </Typography>
                        <ButtonBase>
                            <Button variant='outlined'
                                onClick={showInput}
                            >
                                add new
                            </Button>
                        </ButtonBase>
                        
                    </Grid>
                    <Grid className={classes.head} item xs={6}>
                        <Typography align='left' variant='h5'>Feedback</Typography> 
                        <TextField 
                            type='text'
                            placeholder="search feedback"
                            value={search}
                            onChange={(data) => setSearch(data.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box border={1}>
                <Grid container>
                    <Grid className={classes.boxs} item xs={6}>
                        <List>
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
                            

                        </List>
                    </Grid>
                        <Grid className={classes.boxs} item xs={6}>
                            {selectedIndex === 0 ? (<Typography>Select a customer to show feedback</Typography>):
                                (<List>
                                    <ListItem>
                                        <TextField 
                                            id="standard-basic" 
                                            type='text'
                                            placeholder="Add feedback name"
                                            value={feedbacks}
                                            onChange={handleFeedbackChange}
                                        />
                                        <ButtonGroup variant='text' size='small' color='primary'>
                                            <Button onClick={() => saveFeedback(selectedIndex)}>save</Button>
                                        </ButtonGroup>
                                    </ListItem>
                                    {
                                        state.find(item => item.id === selectedIndex)?.feedback.map(feed => (
                                            <ListItem button key={feed}>
                                                <ListItemText primary={feed}/>
                                            </ListItem>
                                        ))
                                    }
                                    
                                    
                                    
                                </List>)
                            }
                        </Grid>
            </Grid>
            </Box>
        </Container>
    )
}

export default Main;