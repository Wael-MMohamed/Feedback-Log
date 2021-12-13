import React, { useState } from 'react';
import CustomrList from './components/CustomerList';
import FeedbackList from './components/FeedbackList';
import Header from './components/Header';


const Main :React.FC = () => {

    const [toggleInput, setToggleInput] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [search, setSearch] = useState('');
    


    const showFeedback = (customerId : number): void => {
        if(selectedIndex !== customerId){
            setSelectedIndex(customerId)
        }
    }

    function showInput(){
        setToggleInput(true)
    }

    function hideInput(){
        setToggleInput(false)
    }

    return(
        <div className='container' >
                {/* <div main-header> */}
                    <Header search={search} setSearch={setSearch} showInput={showInput}/>
                {/* </div> */}

                

                <div className='lists'>
                           
                    <CustomrList toggleInput={toggleInput} hideInput={hideInput} selectedIndex={selectedIndex} showFeedback={showFeedback}/>
                            

                    <FeedbackList selectedIndex={selectedIndex} search={search} />
                </div>
        </div>
    )
}

export default Main;