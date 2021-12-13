import { useState } from 'react';
import { useCustomerList } from '../app/GlobalState';
import parse from 'html-react-parser';

type Props = {
    selectedIndex : number
    search: string
}

const FeedbackList = (props: Props) => {

    const [feedbacks, setFeedbacks] = useState('');


    const handleFeedbackChange = (event  : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setFeedbacks(event.target.value);
    }

    const saveFeedback = (id: number) => {
        if(feedbacks !== ''){
            dispatch({type:"ADD_NEW_FEEDBACK", payload: { id,name:'',feedback:feedbacks}})
            setFeedbacks('')
        }
        
    }

    const { state, dispatch } = useCustomerList();

    return (
        <div className='feedback-list'>       
            {props.selectedIndex === 0 ? (<p>Select a customer to show feedback</p>):
                                (<ul>
                                    <li>
                                        <input 
                                            className='input'
                                            type='text'
                                            placeholder="Add feedback name"
                                            value={feedbacks}
                                            onChange={handleFeedbackChange}
                                        />
                                        
                                            <button className='btn' onClick={() => saveFeedback(props.selectedIndex)}>save</button>
                                        
                                    </li>
                                    {
                                        state.find(item => item.id === props.selectedIndex)?.feedback.filter(text => text.includes(props.search)).map((feed,index) => (
                                            feed === '' ? null :
                                            (<li key={index}>
                                                <p>{props.search === '' ? feed : parse(feed.replaceAll(props.search, `<mark>${props.search}</mark>`))}</p>
                                            </li>)
                                        ))
                                    }
                                    
                                    
                                    
                                </ul>)
                            }
        </div>
    )
}

export default FeedbackList