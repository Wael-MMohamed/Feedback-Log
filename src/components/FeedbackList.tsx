import { useState } from 'react';
import { useCustomerList } from '../app/GlobalState';

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
        <div>       
            {props.selectedIndex === 0 ? (<h3>Select a customer to show feedback</h3>):
                                (<ul>
                                    <li>
                                        <input 
                                            id="standard-basic" 
                                            type='text'
                                            placeholder="Add feedback name"
                                            value={feedbacks}
                                            onChange={handleFeedbackChange}
                                        />
                                        
                                            <button onClick={() => saveFeedback(props.selectedIndex)}>save</button>
                                        
                                    </li>
                                    {
                                        state.find(item => item.id === props.selectedIndex)?.feedback.filter(text => text.includes(props.search)).map((feed,index) => (
                                            feed === '' ? null :
                                            (<li key={index}>
                                                <p>{props.search === '' ? feed : (feed.replaceAll(props.search, `<mark>${props.search}</mark>`))}</p>
                                            </li>)
                                        ))
                                    }
                                    
                                    
                                    
                                </ul>)
                            }
        </div>
    )
}

export default FeedbackList