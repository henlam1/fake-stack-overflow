import React from 'react';

export default class Main extends React.Component {
    render(){
        //RENDER WELCOME PAGE
        if(this.props.session === "false"){
            return <div>
                <form className = "form" id = "loginForm">
                    <h1>Login</h1>
                    <h2>Email</h2>
                    <input type="text" id = "lemail" name = "lemail" onChange = {this.props.onWelcomeFormChange} value = {this.props.lemail} form = "form"></input>
                    <br></br><br></br>
                    <h2>Password</h2>
                    <input type="password" id = "lpw" name = "lpw" onChange = {this.props.onWelcomeFormChange} value = {this.props.lpw} form = "form"></input>
                    <button type="button" onClick = {this.props.onLoginClick}className="button"> Login </button>
                </form>
                <div id = "welcome">
                    <button type="button" onClick = {this.props.onCreateClick} className="button"> Create Account</button>
                    <br></br><br></br>
                    <button type="button" onClick = {this.props.onGuestClick} className="button"> Continue as Guest</button>
                </div>
            </div>
        }
        //RENDER CREATION PAGE
        if(this.props.session === "create"){
            return <div>
                <form className = "form" id = "createForm">
                    <h1>Create Account</h1>

                    <h2>Username</h2>
                    <input type="text" id = "cuser" name = "cuser" onChange = {this.props.onWelcomeFormChange} value = {this.props.cuser} form = "form"></input>
                    <br></br><br></br>

                    <h2>Email</h2>
                    <input type="text" id = "cemail" name = "cemail" onChange = {this.props.onWelcomeFormChange} value = {this.props.cemail} form = "form"></input>
                    <br></br><br></br>

                    <h2>Password</h2>
                    <input type="password" id = "cpw" name = "cpw" onChange = {this.props.onWelcomeFormChange} value = {this.props.cpw} form = "form"></input>
                    <br></br><br></br>
                    
                    <h2>Confirm Password</h2>
                    <input type="password" id = "cconfirmPw" name = "cconfirmPw" onChange = {this.props.onWelcomeFormChange} value = {this.props.cconfirmPw} form = "form"></input>
                    <br></br><br></br>

                    <button type="button" onClick = {this.props.onCreateSubmit} className="button"> Create Account</button>
                </form>
                <div id = "welcome">
                    <button type="button" onClick = {this.props.onCreateClose} className="button"> Close</button>
                </div>
            </div>

        }
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        //RENDERING QUESTION FORM
        if(this.props.displayForm === "Question"){
            if(this.props.qFormChanged){
                this.props.onQuestionFormErrors();
            }
            return <div>
                <form className = "form" id = "questionForm">
                {this.props.qErrorMessages.map(errorMessage => 
                    <p key = {errorMessage}>
                    {errorMessage}
                    </p>
                )} 
                <h1>Question Title</h1>
                <label htmlFor = "qtitle">Title should not be more than 50 characters.</label>
                <textarea id = "qtitle" name = "qtitle" onChange = {this.props.onQuestionFormChange} value = {this.props.qtitle} form = "form"></textarea>
                <br></br><br></br>

                <h1>Question Summary</h1>
                <label htmlFor="qsummary">Summary should not be more than 140 characters</label>
                <textarea id = "qsummary" name = "qsummary" onChange = {this.props.onQuestionFormChange} value = {this.props.qsummary} form = "form"></textarea>
                <br></br><br></br>

                <h1>Question Text</h1>
                <label htmlFor="qtext">Add details</label>
                <textarea id = "qtext" name = "qtext" onChange = {this.props.onQuestionFormChange} value = {this.props.qtext} form = "form"></textarea>
                <br></br><br></br>

                <h1>Tags</h1>
                <label htmlFor="qtags">Add Keywords separated by whitespace.</label>
                <textarea id = "qtags" name = "qtags" onChange = {this.props.onQuestionFormChange} value = {this.props.qtags} form = "form"></textarea>
                <br></br><br></br>
            
                <button type="button" onClick = {this.props.onQuestionFormSubmit}className="button"> Post Question</button>
                <button type="button" onClick = {this.props.onQuestionFormClose}className="button" id = "cancelButton">Close</button>
                </form>
            </div>
        }
        //RENDERING ANSWER FORM
        if(this.props.displayForm === "Answer"){
            if(this.props.aFormChanged){
                this.props.onAnswerFormErrors();
            }
            return <div>
                <form className = "form" id = "answerForm">
                {this.props.aErrorMessages.map(errorMessage => 
                    <p key = {errorMessage}>
                    {errorMessage}
                    </p>
                )} 
                <h1>Answer Text</h1>
                <label htmlFor="atext">Add details</label>
                <textarea id = "atext" name = "atext" onChange = {this.props.onAnswerFormChange} value = {this.props.atext} form = "form"></textarea>
                <br></br><br></br>

                <button type="button" onClick = {this.props.onAnswerFormSubmit}className="button"> Post Answer</button>
                <button type="button" onClick = {this.props.onAnswerFormClose}className="button" id = "cancelButton">Close</button>
                </form>
            </div>
        }
        //RENDERING USER QUESTION EDIT FORM
        if(this.props.displayForm === "QuestionsEdit"){
            if(this.props.qFormChanged){
                this.props.onQuestionFormErrors();
            }
            return <div>
                <form className = "form" id = "questionForm">
                {this.props.qErrorMessages.map(errorMessage => 
                    <p key = {errorMessage}>
                    {errorMessage}
                    </p>
                )} 
                <h1>Question Title</h1>
                <label htmlFor = "qtitle">Title should not be more than 50 characters.</label>
                <textarea id = "qtitle" name = "qtitle" onChange = {this.props.onQuestionFormChange} value = {this.props.qtitle} form = "form"></textarea>
                <br></br><br></br>

                <h1>Question Summary</h1>
                <label htmlFor="qsummary">Summary should not be more than 140 characters</label>
                <textarea id = "qsummary" name = "qsummary" onChange = {this.props.onQuestionFormChange} value = {this.props.qsummary} form = "form"></textarea>
                <br></br><br></br>

                <h1>Question Text</h1>
                <label htmlFor="qtext">Add details</label>
                <textarea id = "qtext" name = "qtext" onChange = {this.props.onQuestionFormChange} value = {this.props.qtext} form = "form"></textarea>
                <br></br><br></br>

                <h1>Tags</h1>
                <label htmlFor="qtags">Add Keywords separated by whitespace.</label>
                <textarea id = "qtags" name = "qtags" onChange = {this.props.onQuestionFormChange} value = {this.props.qtags} form = "form"></textarea>
                <br></br><br></br>
            
                <button type="button" onClick = {this.props.onEditThingSubmit}className="button"> Edit Question</button>
                <button type="button" onClick = {this.props.onEditThingClose}className="button" id = "cancelButton">Close</button>
                </form>
            </div>
        }
        //RENDERING USER TAG EDIT FORM
        if(this.props.displayForm === "TagsEdit"){
            return <div>
                <form className = "form" id = "questionForm">
                <h1>Tag Name</h1>
                <label htmlFor = "qtitle">Edit tag name.</label>
                <textarea id = "qtitle" name = "qtitle" onChange = {this.props.onQuestionFormChange} value = {this.props.qtitle} form = "form"></textarea>
                <br></br><br></br>
            
                <button type="button" onClick = {this.props.onEditThingSubmit}className="button"> Edit Tag</button>
                <button type="button" onClick = {this.props.onEditThingClose}className="button" id = "cancelButton">Close</button>
                </form>
            </div>
        }
        //RENDERING USER ANSWER EDIT FORM
        if(this.props.displayForm === "AnswersEdit"){
            if(this.props.aFormChanged){
                this.props.onAnswerFormErrors();
            }
            return <div>
                <form className = "form" id = "answerForm">
                {this.props.aErrorMessages.map(errorMessage => 
                    <p key = {errorMessage}>
                    {errorMessage}
                    </p>
                )} 
                <h1>Answer Text</h1>
                <label htmlFor="atext">Add details</label>
                <textarea id = "atext" name = "atext" onChange = {this.props.onAnswerFormChange} value = {this.props.atext} form = "form"></textarea>
                <br></br><br></br>

                <button type="button" onClick = {this.props.onEditThingSubmit}className="button"> Edit Answer</button>
                <button type="button" onClick = {this.props.onEditThingClose}className="button" id = "cancelButton">Close</button>
                </form>
            </div>
        }
        
        //RENDERING QUESTIONS
        if(this.props.displayType === "Questions"){
            let questionArray = this.props.displayResults;
            if(questionArray.length > 0){
                const questions = []
                let guess = 5 * (this.props.qpage + 1);
                let lastIndex = questionArray.length < guess ? questionArray.length : guess

                for(let i = 5 * this.props.qpage; i < lastIndex; i++){
                    let question = questionArray[i];
                    let index = i;

                    const time = new Date(question.ask_date_time);
                    const askedOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
                    const askedAt = time.getHours() + ":" + time.getMinutes();
                    questions.push(<div key = {index}>
                    <br></br>
                    <div className = "questionBlock">
                        <div className = "left">
                            {question.views + " Views"}
                            {<br></br>}
                            {question.answers.length + " Answers"}
                            {<br></br>}
                            {"Votes: "}
                            <div className = "votes"> 
                                <button type = "button" onClick = {() => {this.props.onVote("question", question._id, true, index, question.asked_by._id)}}><i className ="arrow up"></i></button>
                                {question.votes}
                                <button type = "button" onClick = {() => {this.props.onVote("question", question._id, false, index, question.asked_by._id)}}><i className ="arrow down"></i></button>
                            </div>
                        </div>
                        <div className = "middle">
                            <p className = "middleText" onClick = {() => {this.props.onTitleClick(question._id, true)}}>{question.title}</p>
                            <div className = "middleTagBox">
                                {question.tags.map((tag, index) =>
                                <div className = "qTag" key = {index}>{tag.name}</div>
                                )}
                            </div>
                            <div className = "middleSummary">
                                {"Summary: " + question.summary}
                            </div>
                        </div>
                        <div className = "right">
                        {"Asked By: " } <span style = {{color: "blue"}}>{question.asked_by.user}</span>
                        {<br></br>}
                        {"On: "} <span style = {{color: "green"}}>{askedOn}</span>  
                        {<br></br>}
                        {"At: "} <span style = {{color: "purple"}}>{askedAt}</span>
                        {<br></br>}
                        </div>
                    </div>
                    <br></br>
                    <hr className = "dashed"></hr>
                    </div>)
                }
                const prev = [], next = [];
                if(this.props.qpage > 0){
                    prev.push(<button onClick={() => this.props.onPrevClick("qpage")}>Prev</button>)
                }
                if(this.props.qpage < Math.ceil((questionArray.length / 5) - 1)){
                    next.push(<button onClick={() => this.props.onNextClick("qpage")}>Next</button>)
                }
                return(
                <div id = "main">
                    {questions}
                    <div className = "banner" id = "buttonBanner">
                        <div id = "left">
                            {prev}
                        </div>   
                        <div id = "right">
                            {next}
                        </div>   
                    </div>
                </div>
                );
            }
            else{
                return(
                <div id = "main">
                    <div style = {{textAlign: "center"}}>NO QUESTIONS FOUND</div>
                </div>
                );
            }
        }
        //RENDERING TAGS
        if(this.props.displayType === "Tags"){
            let tagArray = this.props.displayResults;
            if(tagArray.length > 0){
                let tagCount = this.props.tagCount, x = 0;
                const tags = tagArray.map(tag => {
                    return <div key = {tag.name} className = "tagBlock">
                    <p onClick = {() => {this.props.onTagLinkClick("["+tag.name+"]")}}>{tag.name} </p>
                    <br></br><br></br>
                    {tagCount[x++] + ' Questions'}
                  </div>
                })
                return(
                <div id = "main">
                    <div className = "tagDisplay">
                        {tags}
                    </div>
                </div>
                )
            }
            else{
                return(
                <div id = "main">
                    <div style = {{textAlign: "center"}}>NO TAGS FOUND</div>
                </div>
                );
            }
        }
        //RENDERING ANSWERS
        if(this.props.displayType === "Answers"){
            let question = this.props.questionDisplayed;    //Question Caller 
            let answers = this.props.displayResults; //Array of questions

            const time = new Date(question.ask_date_time);
            const askedOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
            const askedAt = time.getHours() + ":" + time.getMinutes();

            const qComments = []
            let qcGuess = 3 * (this.props.cpage[0] + 1);
            let qcLastIndex = question.comments.length < qcGuess ? question.comments.length : qcGuess
            for(let i = 3 * this.props.cpage[0]; i < qcLastIndex; i++){
                let comment = question.comments[i];

                const time = new Date(comment.com_date_time);
                const askedOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
                const askedAt = time.getHours() + ":" + time.getMinutes();
                qComments.push(
                    <div className = "questionBlock">
                        <div className = "left"></div>
                        <div className = "middle">
                            {comment.text}
                        </div>
                        <div className = "right">
                            {"Com By: " } <span style = {{color: "blue"}}>{comment.com_by.user}</span>
                            {<br></br>}
                            {"On: "} <span style = {{color: "green"}}>{askedOn}</span>  
                            {<br></br>}
                            {"At: "} <span style = {{color: "purple"}}>{askedAt}</span>
                            {<br></br>}
                        </div>
                        <br></br><br></br><br></br><br></br>
                    </div>)
            }
            const qcPrev = [], qcNext = [];
            if(this.props.cpage[0] > 0){
                qcPrev.push(<button onClick={() => this.props.onCommentPrevClick(0)}>Prev</button>)
            }
            if(this.props.cpage[0] < Math.ceil((question.comments.length / 3) - 1)){
                qcNext.push(<button onClick={() => this.props.onCommentNextClick(0)}>Next</button>)
            }

            const ans = [];
            let aGuess = 5 * (this.props.apage + 1);
            let aLastIndex = answers.length < aGuess ? answers.length : aGuess
            let cPageIndex = 0
            
            for(let i = 5 * this.props.apage; i < aLastIndex; i++){
                ++cPageIndex;
                console.log("cPageIndex: " + cPageIndex)
                let answer = answers[i];
                let index = i;
                let workAround = (i % 5) + 1
                console.log("index: " + index)

                const time = new Date(answer.ans_date_time);
                const ansOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
                const ansAt = time.getHours() + ":" + time.getMinutes();
                
                const aComments = []
                let acGuess = 3 * (this.props.cpage[cPageIndex] + 1);
                let acLastIndex = answer.comments.length < acGuess ? answer.comments.length : acGuess

                for(let i = 3 * this.props.cpage[cPageIndex]; i < acLastIndex; i++){
                    let comment = answer.comments[i];

                    const time = new Date(comment.com_date_time);
                    const askedOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
                    const askedAt = time.getHours() + ":" + time.getMinutes();
                    aComments.push(
                        <div className = "questionBlock">
                            <div className = "left"></div>
                            <div className = "middle">
                                {comment.text}
                            </div>
                            <div className = "right">
                                {"Com By: " } <span style = {{color: "blue"}}>{comment.com_by.user}</span>
                                {<br></br>}
                                {"On: "} <span style = {{color: "green"}}>{askedOn}</span>  
                                {<br></br>}
                                {"At: "} <span style = {{color: "purple"}}>{askedAt}</span>
                                {<br></br>}
                            </div>
                            <br></br><br></br><br></br><br></br>
                        </div>)
                }
                const acPrev = [], acNext = [];
                if(this.props.cpage[cPageIndex] > 0){
                    acPrev.push(<button onClick={() => this.props.onCommentPrevClick(workAround)}>Prev</button>)
                }
                if(this.props.cpage[cPageIndex] < Math.ceil((answer.comments.length / 3) - 1)){
                    acNext.push(<button onClick={() => this.props.onCommentNextClick(workAround)}>Next</button>)
                }
                ans.push(<div key = {answer._id}>
                    <br></br>
                    <div className = "questionBlock">
                        <div className = "left">
                            {"Votes: "}
                            {<br></br>}
                            <div className = "votes"> 
                                <button type = "button" onClick = {() => {this.props.onVote("answer", answer._id, true, index, answer.ans_by._id)}}><i className ="arrow up"></i></button>
                                {answer.votes}
                                <button type = "button" onClick = {() => {this.props.onVote("answer", answer._id, false, index, answer.ans_by._id)}}><i className ="arrow down"></i></button>
                            </div>
                        </div>
                        <div className = "middle">
                            <p className = "answer" >{answer.text}</p>
                                <div className = "questionBlock">
                                <div className = "left"></div>
                                <div className = "middle"><b>COMMENTS</b></div>
                                <div className = "right"></div>
                            </div>
                            {aComments}
                            <div className = "banner" id = "buttonBanner">
                                <div id = "left">
                                    {acPrev}
                                </div>   
                                <div id = "right">
                                    {acNext}
                                </div>   
                            </div>
                        </div>
                        <div className = "right">
                        {"Ans By: " } <span style = {{color: "blue"}}>{answer.ans_by.user}</span>
                        {<br></br>}
                        {"On: "} <span style = {{color: "green"}}>{ansOn}</span>
                        {<br></br>}
                        {"At: "} <span style = {{color: "purple"}}>{ansAt}</span>
                        {<br></br>}
                        </div>
                    </div>
                    <div className = "questionBlock">
                        <div className = "left"></div>
                        <div className = "middle">
                            <input 
                                placeholder = "Enter an Insightful Comment" 
                                onKeyDown = {(e) => {
                                if(e.key === 'Enter') {this.props.onCommentSubmit(e.target.value, "answer", answer._id);}
                                }}
                                id = "sBar">
                            </input>
                        </div>
                        <div className = "right"></div>
                    </div>
                    <br></br>
                    <hr className = "dashed"></hr>
                </div>)
            }
            
            if(this.props.user !== "guest"){
                ans.push(
                <div className = "questionBlock">
                <button id = "answerFormButton" onClick={() => this.props.onAnswerFormClick()}>Answer Question</button>
                </div>)
            }
            const aPrev = [], aNext = [];
            if(this.props.apage > 0){
                aPrev.push(<button onClick={() => this.props.onPrevClick("apage")}>Prev</button>)
            }
            if(this.props.apage < Math.ceil((answers.length / 5) - 1)){
                aNext.push(<button onClick={() => this.props.onNextClick("apage")}>Next</button>)
            }
        
            return(
                <div className = "answerList" id = "main">
                    <br></br>
                    <div className = "questionBlock">
                        <div className = "left">
                            {question.views + " Views"}
                            {<br></br>}{<br></br>}
                            {"Votes: "}
                            <div className = "votes"> 
                                <button type = "button" onClick = {() => {this.props.onVote("question", question._id, true, -1, question.asked_by._id)}}><i className ="arrow up"></i></button>
                                {question.votes}
                                <button type = "button" onClick = {() => {this.props.onVote("question", question._id, false, -1, question.asked_by._id)}}><i className ="arrow down"></i></button>
                            </div>
                        </div>
                        <div className = "middle">
                            {question.text}
                            <div className = "middleTagBox">
                                {question.tags.map((tag, index) =>
                                <div className = "qTag" key = {index}>{tag.name}</div>
                                )}
                            </div>
                        </div>
                        <div className = "right">
                            {"Asked By: " } <span style = {{color: "blue"}}>{question.asked_by.user}</span>
                            {<br></br>}
                            {"On: "} <span style = {{color: "green"}}>{askedOn}</span>  
                            {<br></br>}
                            {"At: "} <span style = {{color: "purple"}}>{askedAt}</span>
                            {<br></br>}
                            {question.asked_by.reputation}
                        </div>
                    </div>
                    <div className = "questionBlock">
                            <div className = "left"></div>
                            <div className = "middle"><b>COMMENTS</b></div>
                            <div className = "right"></div>
                    </div>
                    {qComments}
                    <br></br><br></br>
                    <div className = "banner" id = "buttonBanner">
                        <div id = "left">
                            {qcPrev}
                        </div>   
                        <div id = "right">
                            {qcNext}
                        </div>   
                    </div>
                    <div className = "questionBlock">
                            <div className = "left"></div>
                            <div className = "middle">
                                <input 
                                placeholder = "Enter an Insightful Comment" 
                                onKeyDown = {(e) => {
                                if(e.key === 'Enter') {this.props.onCommentSubmit(e.target.value, "question", question._id);}
                                }}
                                id = "sBar">
                                </input>
                            </div>
                            <div className = "right"></div>
                    </div>
                    <hr className = "dashed"></hr>
                    {ans}
                    <br></br><br></br>
                    <div className = "banner" id = "buttonBanner">
                        <div id = "left">
                            {aPrev}
                        </div>   
                        <div id = "right">
                            {aNext}
                        </div>   
                    </div>
                </div>
            );
        }
        //RENDERING USER PROFILE
        if(this.props.displayType === "User"){
            let thing = this.props.displayResults
            let type = this.props.userDisplayType
            let results
            console.log("THING " + thing)

            if(type === "Questions"){
                if(thing.length > 0){
                    results = thing.map((question, index) => {
                        const time = new Date(question.ask_date_time);
                        const askedOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
                        const askedAt = time.getHours() + ":" + time.getMinutes();
                        return <div key = {index}>
                        <br></br>
                        <div className = "questionBlock">
                            <div className = "left">
                            {question.views + " Views"}
                            {<br></br>}
                            {question.answers.length + " Answers"}
                            {<br></br>}
                            <button type = "button" onClick={() => this.props.onProfileThingEdit("Questions", question)}>EDIT</button>
                            <button type = "button" onClick={() => this.props.onProfileThingDelete("Questions", question._id)}>DELETE</button>
                            </div>
                            <div className = "middle">
                            <p className = "middleText">{question.title}</p>
                            <div className = "middleTagBox">
                                {question.tags.map((tag, index) =>
                                <div className = "qTag" key = {index}>{tag.name}</div>
                                )}
                            </div>
                            <div className = "middleSummary">
                                {"Summary: " + question.summary}
                            </div>
                            </div>
                            <div className = "right">
                            {"Asked By: " } <span style = {{color: "blue"}}>{question.asked_by.user}</span>
                            {<br></br>}
                            {"On: "} <span style = {{color: "green"}}>{askedOn}</span>  
                            {<br></br>}
                            {"At: "} <span style = {{color: "purple"}}>{askedAt}</span>
                            {<br></br>}
                            </div>
                        </div>
                        <br></br>
                        <hr className = "dashed"></hr>
                        </div>
                    })
                }
                else{
                    results = <div style = {{textAlign: "center"}}>NO QUESTIONS FOUND</div>
                }
            }
            if(type === "Tags"){
                if(thing.length > 0){
                    let temp = thing.map(tag => {
                        return <div key = {tag.name} className = "tagBlock">
                        <p>{tag.name} </p>
                            <button type = "button" onClick={() => this.props.onProfileThingEdit("Tags", tag)}>EDIT</button>
                            <button type = "button" onClick={() => this.props.onProfileThingDelete("Tags", tag._id)}>DELETE</button>
                        <br></br><br></br>
                      </div>
                    })
                    results = <div className = "tagDisplay">{temp}</div>
                }
                else{
                    results = <div style = {{textAlign: "center"}}>NO TAGS FOUND</div>
                }
            }
            if(type === "Answers"){
                if(thing.length > 0){
                    results = thing.map((answer) => {
                        const time = new Date(answer.ans_date_time);
                        const ansOn = monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getFullYear();
                        const ansAt = time.getHours() + ":" + time.getMinutes();
                        return (<div key = {answer._id}>
                            <br></br>
                            <div className = "questionBlock">
                                <div className = "left">Clever Text
                                    <br></br>
                                    <button type = "button" onClick={() => this.props.onProfileThingEdit("Answers", answer)}>EDIT</button>
                                    <button type = "button" onClick={() => this.props.onProfileThingDelete("Answers", answer._id)}>DELETE</button>
                                </div>
                                <div className = "middle">
                                    <p className = "answer" >{answer.text}</p>
                                </div>
                                <div className = "right">
                                {"Ans By: " } <span style = {{color: "blue"}}>{answer.ans_by.user}</span>
                                {<br></br>}
                                {"On: "} <span style = {{color: "green"}}>{ansOn}</span>
                                {<br></br>}
                                {"At: "} <span style = {{color: "purple"}}>{ansAt}</span>
                                {<br></br>}
                                </div>
                            </div>
                            <br></br>
                            <hr className = "dashed"></hr>
                        </div>)
                    })
                }
                else{
                    results = <div style = {{textAlign: "center"}}>NO ANSWERS FOUND</div>
                }
            }
            return(
                <div id = "main">
                    <div id = "userDisplay">
                        <div id = "sideBar">
                            <button type = "button" onClick={() => this.props.onProfileThingClick("Questions")}>Questions</button>
                            <button type = "button" onClick={() => this.props.onProfileThingClick("Tags")}>Tags</button>
                            <button type = "button" onClick={() => this.props.onProfileThingClick("Answers")}>Answers</button>
                        </div>
                    </div>
                    {results}
                </div>
                );
        }
    }
}