import { Container, Grid, Typography, Box, ButtonBase, ButtonGroup, Button, TextField } from '@material-ui/core'
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { GlobalContext } from './app/GlobalState';
import parse from 'html-react-parser';

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

const Main = () => {

    const classes = useStyles();
    const { customerList, feedbackList, addNewCustomer, addNewFeedback } = useContext(GlobalContext);
    const [newCustomerName, setNewCustomerName] = useState('')
    const [toggleInput, setToggleInput] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [feedbacks, setFeedbacks] = useState('');
    const [search, setSearch] = useState('');
    

    const handleChange = (event) => {
        event.preventDefault()
        event = event.target.value
        setNewCustomerName(event)
    }

    const showFeedback = (customerId) => {
        if(selectedIndex !== customerId){
            setSelectedIndex(customerId)
        }
    }

    const saveName = () => {
        if(newCustomerName !== ''){
            addNewCustomer(newCustomerName)
            hideInput()
            setSelectedIndex(0)
        }
        
    }

    const handleFeedbackChange = (event) => {
        event.preventDefault()
        event = event.target.value
        setFeedbacks(event)
    }

    const saveFeedback = (id) => {
        if(feedbacks !== ''){
            addNewFeedback(id, feedbacks)
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
                        <Typography flexGrow={1} variant='h5'>
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
                            {customerList.map((item) => {
                                return (<ListItem button key={item.id} selected={selectedIndex === item.id} onClick={() => showFeedback(item.id)}>
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
                                    {feedbackList.filter(item => item.customer_id === selectedIndex && item.feedback.includes(search)).map((item) => {
                                        return(
                                            <ListItem button key={item.id}>
                                                <ListItemText primary={parse(item.feedback.replace(search, `<mark>${search}</mark>`))}/>
                                                {/* {parse(item.feedback.replaceAll(search, `<mark>${search}</mark>`))} */}
                                            </ListItem>
                                        )
                                    })}
                                </List>)
                            }
                        </Grid>
            </Grid>
            </Box>
        </Container>
    )
}

export default Main;