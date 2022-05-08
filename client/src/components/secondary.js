import React from 'react';

export default class Secondary extends React.Component {
    render(){
        if(this.props.session === "false" || this.props.session === "create"){
            return
        }
        else{
            if(this.props.displayForm){
                return null;
            }
            let count = this.props.displayResults.length + " " + this.props.displayType;
            var displayTitle = "";
    
            if(this.props.displayType === "Questions"){
                if(this.props.searchItems.length === 0){
                    if(this.props.tagDisplayed !== ""){
                        displayTitle = "Questions Tagged [" + this.props.tagDisplayed + "]";
                    }
                    else{
                        displayTitle = "All Questions"
                    }
                }
                else{
                    displayTitle = "Search Results"
                }
            }
            else if(this.props.displayType === "Tags"){
                displayTitle = "All Tags"
            }
            else if(this.props.displayType === "Answers"){
                displayTitle = this.props.questionDisplayed.title
            }
            else if(this.props.displayType === "User"){
                let user = this.props.user
                return(<div className = "banner" id = "secondBanner">
                    <h2>User: {user.user}</h2>
                    <h2 id = "middle">Member Since: {user.create_date_time}</h2>
                    <h2>Reputation: {user.reputation}</h2>
                </div>);
            }
    
            return(<div className = "banner" id = "secondBanner">
            <h2>{count}</h2>
            <h2 id = "middle">{displayTitle}</h2>
            <h2>Input By</h2>
            </div>
            );
        }
    }
}