import React from 'react';
import Banner from './banner.js';
import Secondary from './secondary.js';
import Main from './main.js';
import axios from 'axios';

export default class FakeStackOverflow extends React.Component {
  //Constructor
  constructor(props){
    super(props);
    // JSON.parse(window.localStorage.getItem('state')) ||
    this.state = JSON.parse(window.localStorage.getItem('state')) ||{
      //Session
      session: "false",
      user: "",

      //Welcome Page
      lemail : '',
      lpw : '',
      
      cuser: '',
      cemail: '',
      cpw: '',
      cconfirmPw: '',

      //Banner Clicks
      displayType: "Questions",
      userDisplayType: "Questions",
      displayResults: [],
      searchItems: [],
      searchId: '',

      //Main
      questionDisplayed: [],  //Title Clicked
      tagDisplayed: "", //Tag Clicked
      tagCount: [],
      qpage: 0,
      apage: 0,
      cpage: [0,0,0,0,0,0],
      votes: 0,

      //Form Clicks
      displayForm: "",

      //Form Inputs
      qtitle : '',
      qsummary: '',
      qtext : '',
      qtags : '',
      qErrorMessages : [],
      qFormChanged : false,

      atext : '',
      aErrorMessages : [],
      aFormChanged : false,
    };
    //Binding!
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.handleWelcomeFormChange = this.handleWelcomeFormChange.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);

    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleProfileThingClick = this.handleProfileThingClick.bind(this);
    this.handleProfileThingEdit = this.handleProfileThingEdit.bind(this);
    this.handleProfileThingDelete = this.handleProfileThingDelete.bind(this);
    this.handleEditThingSubmit = this.handleEditThingSubmit.bind(this);
    this.handleEditThingClose = this.handleEditThingClose.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);

    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleTagLinkClick = this.handleTagLinkClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleCommentNextClick = this.handleCommentNextClick.bind(this);
    this.handleCommentPrevClick = this.handleCommentPrevClick.bind(this);
    
    this.handleQuestionFormClick = this.handleQuestionFormClick.bind(this);
    this.handleQuestionFormChange = this.handleQuestionFormChange.bind(this);
    this.handleQuestionFormErrors = this.handleQuestionFormErrors.bind(this);
    this.handleQuestionFormSubmit = this.handleQuestionFormSubmit.bind(this);
    this.handleQuestionFormClose = this.handleQuestionFormClose.bind(this);

    this.handleAnswerFormClick = this.handleAnswerFormClick.bind(this);
    this.handleAnswerFormChange = this.handleAnswerFormChange.bind(this);
    this.handleAnswerFormErrors = this.handleAnswerFormErrors.bind(this);
    this.handleAnswerFormSubmit = this.handleAnswerFormSubmit.bind(this);
    this.handleAnswerFormClose = this.handleAnswerFormClose.bind(this);
    
    this.handleTagCreate = this.handleTagCreate.bind(this);
    this.handleQuestionCreate = this.handleQuestionCreate.bind(this);
    this.handleAnswerCreate = this.handleAnswerCreate.bind(this);
    this.handleCommentCreate = this.handleCommentCreate.bind(this);
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  resetState(){
    this.setState({
      //Session
      session: "false",
      user: "",

      //Welcome Page
      lemail : '',
      lpw : '',
      
      cuser: '',
      cemail: '',
      cpw: '',
      cconfirmPw: '',

      //Banner Clicks
      displayType: "Questions",
      userDisplayType: "Questions",
      displayResults: [],
      searchItems: [],
      searchId: '',

      //Main
      questionDisplayed: [],  //Title Clicked
      tagDisplayed: "", //Tag Clicked
      tagCount: [],
      qpage: 0,
      apage: 0,
      cpage: [0,0,0,0,0,0],
      votes: 0,

      //Form Clicks
      displayForm: "",

      //Form Inputs
      qtitle : '',
      qsummary: '',
      qtext : '',
      qtags : '',
      qErrorMessages : [],
      qFormChanged : false,

      atext : '',
      aErrorMessages : [],
      aFormChanged : false,
    })
  }

  componentDidMount(){
    // this.handleQuestionClick();
    // this.setState({
    //   session: "false",
    // })
    // axios.get('http://localhost:8000/')
    //   .then(res => {
    //     console.log(res)
    //     if(res.data === 1){
    //       alert("Hello! I am an alert box!!");
    //     }
    //   })
    // alert("Hello! I am an alert box!!");
  }

  //LOGIN HANDLERS
  async handleLoginClick(){
    try{
      const s = this.state
      const user = {
        email: s.lemail,
        password: s.lpw,
      }
      return axios.post('http://localhost:8000/login', user)
      .then(res => {
        console.log(res.data)
        const error = res.data[0]
        if(error === "0"){ //SUCCESS
          alert("Login Successful. VERY NICE");
          this.handleWelcomeFormClose()
          this.setState({
            ...this.state,
            session: "true",
            user: res.data[1],
          })
          this.handleQuestionClick();
        }
        if(error === "1") alert("Email is unregistered");  //FAILS
        if(error === "2") alert("Wrong password")
      })
    }
    catch(error){
      console.log(error);
      alert(error);
      this.resetState();
    }
  }
  handleCreateClick(){
    this.handleWelcomeFormClose()
    this.setState({
      ...this.state,
      session: "create",
    })
  }
  async handleCreateSubmit(){
    try{
      const s = this.state
      const user = {
        user: s.cuser,
        email: s.cemail,
        password: s.cpw,
        confirmPassword: s.cconfirmPw,
      }
      return axios.post('http://localhost:8000/register', user)
      .then(res => {
        console.log(res.data)
        const error = res.data
        if(res.data === 0){ //SUCCESS
          alert("Account successfully created. GREAT JOB!");
          this.handleCreateClose();
        }
        if(error === 1) alert("Username can't be empty");  //FAILS
        if(error === 2) alert("Invalid email");
        if(error === 3) alert("Passwords dont match");
        if(error === 4) alert("Password contains username/email");
        if(error === 5) alert("Email already in use");
      });
    }
    catch(error){
      console.log(error);
    }
  }
  handleCreateClose(){
    this.handleWelcomeFormClose()
    this.setState({
      ...this.state,
      session: "false",
    })
  }
  async handleGuestClick(){
    try{
      return axios.post('http://localhost:8000/guest')
      .then(res => {
        this.setState({
          ...this.state,
          session: "true",
          user: res.data,
        })
        this.handleQuestionClick();
      })
    }
    catch(error){
      console.log(error);
      alert(error);
      this.resetState();
    }
  }
  handleWelcomeFormChange(e){
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value,
    });
  }
  handleWelcomeFormClose(){
    this.setState({
      ...this.state,
      lemail : '',
      lpw : '',
      
      cuser: '',
      cemail: '',
      cpw: '',
      cconfirmPw: '',
    })
  }
  async handleLogOutClick(){
    try{
      return axios.post('http://localhost:8000/logout')
      .then(res => {
        alert( res.data + ". You'll be missed.");
        this.handleWelcomeFormClose()
        this.resetState();
      })
    }
    catch(error){
      console.log(error);
      alert("Logout failed due to communication errors :(")
    }
  }

  //BANNER HANDLERS
  handleQuestionClick(){
    try{
      axios.get('http://localhost:8000/main/question', {params: {searchItems: ""}})
        .then(res => {
          this.handleFormClear();
          this.setState({
            ...this.state,
            displayType: "Questions",
            displayResults: res.data,
            searchItems: [],
            questionDisplayed: [],
            tagDisplayed: "",
          })
          console.log("REGULAR\n" + this.state.displayResults)
        })
        this.handleFormClear();
    }
    catch(err){
      console.log(err)
      alert("Questions couldn't be loaded")
    }
  }
  handleTagClick(){
    try{
      axios.get('http://localhost:8000/main/tag')
        .then(res => {
          this.handleFormClear();
          this.setState({
            ...this.state,
            displayType: "Tags",
            displayResults: res.data[0],
            searchItems: [],
            questionDisplayed: [],
            tagDisplayed: "",
            tagCount: res.data[1],
          })
          console.log("TAGS\n" + this.state.displayResults)
        })
    }
    catch(err){
      console.log(err)
      alert("Tags couldn't be loaded")
    }
  }
  handleProfileClick(){
    try{
      this.setState({
        ...this.state,
        displayResults: [],
        displayType: "User",
      })
      this.handleProfileThingClick("Questions");
    }
    catch(err){
      console.log(err)
      alert("Profile couldn't be loaded")
    }
  }
  handleProfileThingClick(type){
    try{
      axios.get('http://localhost:8000/main/userStuff', {params: {params: [this.state.user._id, type]}})
        .then(res => {
          this.setState({
            ...this.state,
            userDisplayType: type,
            displayResults: res.data,
          })
        })
    }
    catch(err){
      console.log(err)
      alert("Profile sidebar items couldn't be loaded")
    }
  }
  handleProfileThingEdit(type, thing){
    let display = type + "Edit"
    if(type === "Questions"){
      let tags = "";
      for(let i = 0; i < thing.tags.length; i++){
        tags += thing.tags[i].name + " ";
      }
      this.setState({
        ...this.state,
        qtitle : thing.title,
        qsummary: thing.summary,
        qtext : thing.text,
        qtags : tags,
        searchId : thing._id,
        displayForm: display,
      })
    }
    if(type === "Tags"){
      this.setState({
        ...this.state,
        qtitle : thing.name,
        searchId : thing._id,
        displayForm: display,
      })
    }
    if(type === "Answers"){
      this.setState({
        ...this.state,
        atext : thing.text,
        searchId : thing._id,
        displayForm: display,
      })
    }
  }
  handleProfileThingDelete(type, thing_id){
    try{
      axios.delete('http://localhost:8000/main/deleteUserStuff', {params: {params: [type, thing_id]}})
        .then(res => {
          this.handleProfileThingClick(this.state.userDisplayType)
        })
    }
    catch(err){
      console.log(err)
      alert("Deletion failed")
    }
  }
  async handleEditThingSubmit(){
    try{
      let type = this.state.displayForm
      if(type === "QuestionsEdit"){
        let s = this.state;
        let user = this.state.user;
        const highRep = (user.reputation >= 100) ? true : false;
        let tags = s.qtags.toLowerCase().trim().split(" ");
        let tagList = [...new Set(tags)]
        await Promise.all(tagList.map(tag => {
          return this.handleTagCreate(tag, highRep, user._id)
        }))
        .then((tags) => {
          var blanks = false;
          const refinedTags = tags.filter(tag => {
            if(tag === ""){
              blanks = true;
              return false;
            }
            return true
          })
          .map(tag => {
            return tag._id
          })
          const question = {
            title: s.qtitle,
            summary: s.qsummary,
            text: s.qtext,
            tags: refinedTags,
          }
          axios.post('http://localhost:8000/main/updateQuestion', {question: question, q_id: s.searchId})
          .then(res => {
              console.log("QUESTION UPDATED " + res.data);
              if(blanks){alert("Some tags could not be made. Your rep not high enough lol (100 required).")}
              this.handleEditThingClose();
              this.handleProfileThingClick("Questions")
              return res.data;
          });  
        })
      }
      if(type === "TagsEdit"){
        const tag = {
          name: this.state.qtitle
        }
        await axios.post('http://localhost:8000/main/updateTag', { tag: tag, t_id: this.state.searchId })
        .then(res => {
          console.log("TAG RETURNED " + res.data);
          this.handleEditThingClose();
          this.handleProfileThingClick("Tags")
          return res.data;
        })
      }
      if(type === "AnswersEdit"){
        const answer = {
          text: this.state.atext
        }
        await axios.post('http://localhost:8000/main/updateAnswer', { answer: answer, a_id: this.state.searchId })
        .then(res => {
          console.log("ANSWER RETURNED " + res.data);
          this.handleEditThingClose();
          this.handleProfileThingClick("Answers")
          return res.data;
        })
      }
    }
    catch(err){
      console.log(err)
      alert("Edit failed somehow")
    }
  }
  handleEditThingClose(){
    this.setState({
      ...this.state,
      displayForm: "",
    })
  }
  handleSearchClick(searchString){  
    const searchItems = (searchString) === ""? "" : searchString.trim().toLowerCase().split(" ")

    axios.get('http://localhost:8000/main/question', {params: {searchItems: searchItems}})  
      .then(res => {
        this.handleFormClear();
        this.setState({
          ...this.state,
          displayType: "Questions",
          displayResults: res.data,
          searchItems: searchItems,
        })
        console.log("SEARCH\n" + this.state.displayResults)
      })
  }

  //MAIN HANDLERS
  handleTitleClick(q_id, increment){
    try{
      axios.get('http://localhost:8000/main/answer', {params: {params: [q_id, increment]}})
        .then(res =>{
          const answers =  res.data[1].reverse()
          const question = res.data[0];
          question.comments.reverse()
          for(let i = 0; i < answers.length; i++){
            answers[i].comments.reverse();
          }
          console.log(question)
          this.setState({
            ...this.state,
            displayType: "Answers",
            displayResults: answers,
            searchItems: [q_id],
            questionDisplayed: question,
          })
          console.log("ANSWERS\n" + this.state.displayResults)
        })
    }
    catch(err){
      console.log(err)
      alert("Answers couldn't be loaded")
    }
  }
  handleTagLinkClick(tagName){
    try{
      const searchItems = tagName.trim().toLowerCase().split(" ")
      axios.get('http://localhost:8000/main/question', {params: {searchItems: searchItems}})
        .then(res => {
          this.setState({
            ...this.state,
            displayType: "Questions",
            displayResults: res.data,
            questionDisplayed: [],
            tagDisplayed: tagName,
          })
          console.log("REGULAR\n" + this.state.displayResults)
        })
    }
    catch(err){
      console.log(err)
      alert("Tags couldn't be loaded")
    }
  }
  handleNextClick(page){
    this.setState({
      ...this.state,
      [page]: this.state[page] + 1
    })
  }
  handlePrevClick(page){
    this.setState({
      ...this.state,
      [page]: this.state[page] - 1
    })
  }
  handleCommentNextClick(page){
    console.log("PAge " + page)
    let cpage = [...this.state.cpage]
    cpage[page] += 1
    this.setState({
      ...this.state,
      cpage,
    })
    console.log(this.state.cpage)
  }
  handleCommentPrevClick(page){
    console.log("PAge " + page)
    let cpage = [...this.state.cpage]
    cpage[page] -= 1
    this.setState({
      ...this.state,
      cpage,
    })
    console.log(this.state.cpage)
  }
  handleVote(thing, thing_id, bool, index, u_id){
    try{
      let user = this.state.user;
      const highRep = (user.reputation >= 100) ? true : false;
      if(highRep){
        const match = (this.state.user._id === u_id)? true : false
        if(index >= 0){
          axios.get('http://localhost:8000/main/vote', {params: {params: [thing, thing_id, bool, u_id]}})
          .then(res => {
            console.log(res.data)
            console.log("VOTE RESULTS: " + res.data)
            const display = this.state.displayResults;
            display[index] = res.data[1];
            this.setState({
              ...this.state,
              user: (match) ? res.data[0] : this.state.user,
              displayResults: display,
            })
          })
        }
        else{
          axios.get('http://localhost:8000/main/vote', {params: {params: [thing, thing_id, bool, u_id]}})
          .then(res => {
            console.log(res.data)
            console.log("VOTE RESULTS: " + res.data)
            this.setState({
              ...this.state,
              user: (match) ? res.data[0] : this.state.user,
              questionDisplayed: res.data[1],
            })
          })
        }
      }
      else{
        alert("Not high enough rep to vote")
      }
    }
    catch(error){
      console.log(error);
      alert("Vote update failed")
    }
    console.log("VOTE CHANGED")
  }

  //FORM HANDLERS
  handleFormClear(){
    this.setState({
      ...this.state,
      displayForm: "",

      qtitle : '',
      qsummary : '',
      qtext : '',
      qtags : '',
      qErrorMessages : [],
      qFormChanged : false,

      atext : '',
      aErrorMessages : [],
      aFormChanged : false,
    })
  }

  handleQuestionFormClick(){
    this.setState({
      ...this.state,
      displayForm: "Question",
    })
  }
  handleQuestionFormChange(e){
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value,
      qFormChanged: true,
      qErrorMessages: [],
    });
  }
  handleQuestionFormErrors(){
    let errorMessages = this.state.qErrorMessages;
    if(this.state.qtitle.length > 50) errorMessages.push("Title can't be more than 50 characters!");
    else if(this.state.qtitle.length === 0) errorMessages.push("Title can't be empty!");
    if(this.state.qsummary.length > 140) errorMessages.push("Summary can't be more than 140 characters!")
    if(this.state.qtext.length === 0) errorMessages.push("Question text can't be empty!");
    if(this.state.qtags.length === 0) errorMessages.push("Tags can't be empty!");
  }
  async handleQuestionFormSubmit(){
    try{
      this.setState({
        ...this.state,
        qErrorMessages: []
      });  //Quick Refresh
      if(this.state.qErrorMessages.length === 0 && this.state.qFormChanged){
        //MAKE QUESTION. TITLE, TEXT, TAGS, ASKED BY
        let s = this.state;
        await this.handleQuestionCreate(s.qtitle, s.qsummary, s.qtext, s.qtags, [], s.user, new Date(), s.user.email)
        .then(res => {
          this.handleQuestionFormClose();
          this.handleQuestionClick();
        })
      }
      else{
        this.setState({
          ...this.state,
          qFormChanged : true,
        });
      }
    }
    catch(error){
      console.log(error);
      alert("Question Form couldn't be submitted")
    }
  }
  handleQuestionFormClose(){
    this.handleQuestionClick();
  }

  handleAnswerFormClick(){
    this.setState({
      ...this.state,
      displayForm: "Answer",
    })
  }
  handleAnswerFormChange(e){
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value,
      aFormChanged: true,
      aErrorMessages: [],
    });
  }
  handleAnswerFormErrors(){
    let errorMessages = this.state.aErrorMessages;
    if(this.state.atext.length === 0) errorMessages.push("Question text can't be empty!");
  }
  async handleAnswerFormSubmit(){
    try{
      this.setState({
        ...this.state,
        aErrorMessages: []});  //Quick Refresh
      if(this.state.aErrorMessages.length === 0 && this.state.aFormChanged){
        let s = this.state;
        await this.handleAnswerCreate(s.atext, s.user, new Date(), this.state.searchItems[0])
        .then(res => {this.handleAnswerFormClose();})
      }
      else{
        this.setState({
          ...this.state,
          aFormChanged: true,
        });
      }
    }
    catch(error){
      console.log(error);
      alert("Answer Form couldn't be submitted")
    }
  }
  handleAnswerFormClose(){
    this.handleFormClear();
    this.handleTitleClick(this.state.searchItems[0], false);
  }

  //CREATION HANDLERS
  handleTagCreate(name, highRep){
    try{
      const tag = {
        name: name,
        created_by: this.state.user._id
      }
      return axios.post('http://localhost:8000/main/addTag', {tag : tag, highRep: highRep})
        .then(res => {
          console.log("TAG RETURNED " + res.data);
          return res.data;
      });
    }
    catch(error){
      console.log(error);
      alert("Tag couldn't be created")
    }
  }
  async handleQuestionCreate(title, summary, text, tags, answers, asked_by, ask_date_time, asked_by_email){
    //Tags: "yaba daba doo" -> ["yaba", "daba", "doo"] -> [ObjectID, ObjectID, ObjectID]
    try{ 
      console.log("CURRENT REP: " + this.state.user.reputation)
      let user = this.state.user;
      const highRep = (user.reputation >= 100) ? true : false;
      tags = tags.toLowerCase().trim().split(" ");
      let tagList = [...new Set(tags)]
      await Promise.all(tagList.map(tag => {
        return this.handleTagCreate(tag, highRep, user._id)
      }))
      .then((tags) => {
        var blanks = false;
        const refinedTags = tags.filter(tag => {
          if(tag === ""){
            blanks = true;
            return false;
          }
          return true
        })
        const question = {
          title: title,
          summary: summary,
          text: text,
          tags: refinedTags,
          answers: answers,
          asked_by: asked_by,
          ask_date_time: ask_date_time,
          asked_by_email: asked_by_email,
        }
        axios.post('http://localhost:8000/main/addQuestion', question)
        .then(res => {
            console.log("QUESTION RETURNED " + res.data);
            if(blanks){alert("Some tags could not be made. Your rep not high enough lol (100 required).")}
            this.handleQuestionClick();
            return res.data;
        });    
      })
    }
    catch(error){
      console.log(error)
      alert("Question couldn't be created")
    }
  }
  async handleAnswerCreate(text, ans_by, ans_date_time, q_id){
    try{
      const answer = {
        text: text,
        ans_by: ans_by,
        ans_date_time: ans_date_time,
      }
      await axios.post('http://localhost:8000/main/addAnswer', { answer: answer, q_id: q_id })
      .then(res => {
        console.log("ANSWER RETURNED " + res.data);
        return res.data;
      })
    }
    catch(error){
      console.log(error);
      alert("Answer couldn't be created")
    }
  }
  async handleCommentCreate(text, type, thing_id){
    try{
      if(text.length > 140){
        alert("Comment can't be longer than 140 letters lol")
        return;
      }
      if(this.state.user.reputation < 100){
        alert("Your rep is not high enough(100 required)")
        return;
      }
      const comment = {
        text: text,
        com_by: this.state.user,
      }
      await axios.post('http://localhost:8000/main/addComment', {comment: comment, type: type, thing_id: thing_id})
      .then(res => {
        this.handleTitleClick(this.state.questionDisplayed._id, false);
        console.log("COMMENT RETURNED " + res.data);
        return res.data;
      })
    }
    catch(error){
      console.log(error);
      alert("Comment couldn't be created")
    }
  }
  
  render() {
    return (
      <div> 
        <Banner
          {...this.state}
          displayType = {this.state.displayType}
          onQuestionClick = {this.handleQuestionClick}
          onTagClick = {this.handleTagClick}
          onProfileClick = {this.handleProfileClick}

          onSearchClick = {this.handleSearchClick}
          onQuestionFormClick = {this.handleQuestionFormClick}
          onLogOutClick = {this.handleLogOutClick}
        >
        </Banner>
        <Secondary 
          {...this.state}
        >
        </Secondary>
        <Main
          {...this.state}
          onLoginClick = {this.handleLoginClick}
          onCreateClick = {this.handleCreateClick}
          onCreateSubmit = {this.handleCreateSubmit}
          onCreateClose = {this.handleCreateClose}
          onGuestClick = {this.handleGuestClick}
          onWelcomeFormChange = {this.handleWelcomeFormChange}

          onTitleClick = {this.handleTitleClick}
          onTagLinkClick = {this.handleTagLinkClick}
          onNextClick = {this.handleNextClick}
          onPrevClick = {this.handlePrevClick}
          onCommentNextClick = {this.handleCommentNextClick}
          onCommentPrevClick = {this.handleCommentPrevClick}
          onVote = {this.handleVote}
        
          onQuestionFormChange = {this.handleQuestionFormChange}
          onQuestionFormErrors = {this.handleQuestionFormErrors}
          onQuestionFormSubmit = {this.handleQuestionFormSubmit}
          onQuestionFormClose = {this.handleQuestionFormClose}

          onAnswerFormClick = {this.handleAnswerFormClick}
          onAnswerFormChange = {this.handleAnswerFormChange}
          onAnswerFormErrors = {this.handleAnswerFormErrors}
          onAnswerFormSubmit = {this.handleAnswerFormSubmit}
          onAnswerFormClose = {this.handleAnswerFormClose}
          onCommentSubmit = {this.handleCommentCreate}

          onProfileThingClick = {this.handleProfileThingClick}
          onProfileThingEdit = {this.handleProfileThingEdit}
          onProfileThingDelete = {this.handleProfileThingDelete}
          onEditThingSubmit = {this.handleEditThingSubmit}
          onEditThingClose = {this.handleEditThingClose}
        >  
        </Main>
      </div>);
  }
}
