import React from 'react';

export default class Banner extends React.Component{
  render(){
    if(this.props.session === "false" || this.props.session === "create"){
      return(
        <div className = "banner" id = "welcomeBanner">
          <h1>Fake Stack Overflow</h1>
        </div>
      )
    }
    else{
      const ask = [], user = [];
      console.log(this.props.user)
      if(this.props.user.user !== "guest"){
        ask.push(<button onClick={() => this.props.onQuestionFormClick()} key = {0}>Ask A Question</button>)
        user.push(
        <button type = "button" onClick={() => this.props.onProfileClick()} style ={{backgroundColor: this.props.displayType === "User" ? '#0281E8' : ''}} key = {0}>
          {this.props.user.user}
        </button>)
      }
      
      return(
        <div className = "banner" id = "topBanner">
          <button 
            type = "button" 
            onClick = {() => {
              this.props.onQuestionClick()
            }}
            style ={{backgroundColor: (this.props.displayType === "Questions" || this.props.displayType === "Answers") ? '#0281E8' : ''}}
            id = "qButton">
            Questions
          </button>
    
          <button 
            type = "button" 
            onClick = {() => {
              this.props.onTagClick()
            }}
            style ={{backgroundColor: this.props.displayType === "Tags" ? '#0281E8' : ''}}
            id = "qButton">
            Tags
          </button>

          {user}
    
          <h1>Fake Stack Overflow</h1>
            
          {ask}

          <input 
            placeholder = "Search Here" 
            onKeyDown = {(e) => {
              if(e.key === 'Enter') {this.props.onSearchClick(e.target.value);}
            }}
            id = "sBar">
          </input>

          <button 
            type = "button" 
            onClick = {() => {this.props.onLogOutClick()}}>
            Logout
          </button>

        </div>
      );
    }
  }
}