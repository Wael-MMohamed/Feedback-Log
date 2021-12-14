
type Props = {
    showInput() : void
    search: string
    setSearch(text : string) : void    
}

const Header = (props : Props) => {


    return (
        <div className="main-header">
            <div className="main-title">
                <h2>Customer Feedback</h2>
            </div>
            
            <div className="controls">
                <div className="sub">
                    <div>
                        <h5 className="titles">Customers</h5>
                    </div>
                    
                    <div>
                        <button className="btn" onClick={props.showInput} > add new </button>
                    </div>
                </div>
                <div className="sub">
                    <div>
                        <h5 className="titles">Feedback</h5>
                    </div>
                        
                    <div>
                        <input
                        className="input"
                        type='text'
                        placeholder="search feedback"
                        value={props.search}
                        onChange={(data : React.ChangeEvent<HTMLInputElement>) => props.setSearch(data.target.value)} 
                        />
                    </div> 
                </div>
                
                
            </div>
            
               
        </div>
    )
}


export default Header;