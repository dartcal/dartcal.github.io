import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from './modal';
import { Input } from 'reactstrap';
import logo from '../pictures/DartCalLogo.png';
import userpic from '../pictures/profileuser.png';
import search from '../pictures/search.png';
import plus from '../pictures/plus.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import '../cssfolder/calendar.css' 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import * as db from './datastore';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false, 
      eventTitle:"", 
      eventDateStart:"", 
      eventDateEnd:"", 
      eventType:"",
      eventTimeStart: "",
      eventTimeEnd: "",
      showClasses: true,
      showClubs: true,
      showSocial: true,
      showOther: true,
      userID: '',
      userEmail: '',
      userFirstName: '',
      userLastName: '',
      userYear: '',
      image: '',
      calID: '',
      calendarEvents: [{event:"Dartmouth founding", start:"1769-12-13"}],
      unshownEvents: []
    };
  }

  calendarRef = React.createRef()

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  handleEventClick = (calEvent) => {
    var event = calEvent.event
    console.log(event)
    db.deleteCalEvent(this.state.userID, event.id, this.setCalInfo)
  }

  handleDateClick = (arg) => { 
    var name = prompt('Enter event name');
    if (name != null){
      var event = {
        title: name,
        start: arg.dateStr,
        id: name+arg.dateStr,
        className :'eTypeOther'
      }

      db.addCalEvent(this.state.userID, name+arg.dateStr, event)
      db.getCalEvents(this.state.userID, this.setCalInfo);
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  createEventTitle = (event) => {
    this.setState({eventTitle: event.target.value});
  }

  createEventType = (event) => {
    this.setState({eventType: event.target.value});
  }

  createDateStart = (event) => {
    this.setState({eventDateStart: event.target.value});
  }

  createDateEnd = (event) => {
    this.setState({eventDateEnd: event.target.value});
  }
  handleCheckboxChangeClasses = () => {
    //add other type events back in 
    if(this.state.showClasses === false){
      var array = Array.from(this.state.calendarEvents) //copies the array
      for (let i = Object.keys(this.state.unshownEvents).length-1; i >= 0; i -= 1) {
        const currentKey = Object.keys(this.state.unshownEvents)[i];
        const currItem = this.state.unshownEvents[currentKey];
        if(currItem.className === "eTypeClass"){
          array.push(currItem);
          this.state.unshownEvents.splice(i, 1)
        }
      }
      this.setState({calendarEvents: array})
    }
    // take other type events out
    else {
      var array = Array.from(this.state.calendarEvents) //copies the array
      for (let i = Object.keys(this.state.calendarEvents).length -1 ; i >= 0; i -= 1) {
        const currentKey = Object.keys(this.state.calendarEvents)[i];
        const currItem = this.state.calendarEvents[currentKey];
        if(currItem.className === 'eTypeClass'){
          this.state.unshownEvents.push(currItem);
          array.splice(i, 1)
        }       
      }
      this.setState({calendarEvents: array})
    }
    this.setState({ showClasses: !this.state.showClasses })
  }

    handleCheckboxChangeClubs = () => {
      //add other type events back in 
      if(this.state.showClubs === false){
        var array = Array.from(this.state.calendarEvents) //copies the array
        for (let i = Object.keys(this.state.unshownEvents).length-1; i >= 0; i -= 1) {
          const currentKey = Object.keys(this.state.unshownEvents)[i];
          const currItem = this.state.unshownEvents[currentKey];
          if(currItem.className === "eTypeClub"){
            array.push(currItem);
            this.state.unshownEvents.splice(i, 1)
          }
        }
        this.setState({calendarEvents: array})
      }
      // take other type events out
      else {
        var array = Array.from(this.state.calendarEvents) //copies the array
        for (let i = Object.keys(this.state.calendarEvents).length -1 ; i >= 0; i -= 1) {
          const currentKey = Object.keys(this.state.calendarEvents)[i];
          const currItem = this.state.calendarEvents[currentKey];
          if(currItem.className === 'eTypeClub'){
            this.state.unshownEvents.push(currItem);
            console.log(i)
            array.splice(i, 1)
          }       
        }
        this.setState({calendarEvents: array})
      }
      this.setState({ showClubs: !this.state.showClubs })
    }

    handleCheckboxChangeSocial = () => {
      //add social type events back in 
      if(this.state.showSocial === false){
        var array = Array.from(this.state.calendarEvents) //copies the array
        for (let i = Object.keys(this.state.unshownEvents).length-1; i >= 0; i -= 1) {
          const currentKey = Object.keys(this.state.unshownEvents)[i];
          const currItem = this.state.unshownEvents[currentKey];
          if(currItem.className === "eTypeSocial"){
            array.push(currItem);
            this.state.unshownEvents.splice(i, 1)
          }
        }
        this.setState({calendarEvents: array})
      }
      // take social type events out
      else {
        var array = Array.from(this.state.calendarEvents) //copies the array
        for (let i = Object.keys(this.state.calendarEvents).length -1 ; i >= 0; i -= 1) {
          const currentKey = Object.keys(this.state.calendarEvents)[i];
          const currItem = this.state.calendarEvents[currentKey];
          if(currItem.className === 'eTypeSocial'){
            this.state.unshownEvents.push(currItem);
            array.splice(i, 1)
          }       
        }
        this.setState({calendarEvents: array})
      }
      this.setState({ showSocial: !this.state.showSocial })
    }

  handleCheckboxChangeOther = () => {
    //add other type events back in 
    if(this.state.showOther === false){
      var array = Array.from(this.state.calendarEvents) //copies the array
      for (let i = Object.keys(this.state.unshownEvents).length-1; i >= 0; i -= 1) {
        const currentKey = Object.keys(this.state.unshownEvents)[i];
        const currItem = this.state.unshownEvents[currentKey];
        if(currItem.className === "eTypeOther"){
          array.push(currItem);
          this.state.unshownEvents.splice(i, 1)
        }
      }
      this.setState({calendarEvents: array})
    }
    // take other type events out
    else {
      var array = Array.from(this.state.calendarEvents) //copies the array
      for (let i = Object.keys(this.state.calendarEvents).length-1; i >= 0; i -= 1) {
        const currentKey = Object.keys(this.state.calendarEvents)[i];
        const currItem = this.state.calendarEvents[currentKey];
        if(currItem.className === 'eTypeOther'){
          this.state.unshownEvents.push(currItem);
          array.splice(i, 1)
        }       
      }
      this.setState({calendarEvents: array})
    }
    this.setState({ showOther: !this.state.showOther })
  }

  getEvents = (calendarE) => {
    var array = []
    for (let i = 0; i < Object.keys(calendarE).length; i += 1) {
      const currentKey = Object.keys(calendarE)[i];
      const currItem = calendarE[currentKey];

      array.push(currItem);
    }
    this.setState({calendarEvents: array})
  }

  setCurrUser = (currUser) => {
    this.setState({
       userID: currUser.userID,
       userEmail: currUser.userEmail,
       userFirstName: currUser.userFirstName,
       userLastName: currUser.userLastName,
       userYear: currUser.userYear,
       image: currUser.userPic,
     });

     db.getCalEvents(this.state.userID, this.setCalInfo);
  }

  setCalInfo = (calendarE) => {
    if(calendarE != null){
      var array = []
      for (let i = 0; i < Object.keys(calendarE).length; i += 1) {
        const currentKey = Object.keys(calendarE)[i];
        const currItem = calendarE[currentKey];

        array.push(currItem);
      }
      this.setState({calendarEvents: array})
    }
  }

  componentDidMount() {
    db.getUserAndCal(this.callback)
    console.log("setting info")
  }

  callback = (events, currUser) => {
    if(events != null) {

      var array = []
      for (let i = 0; i < Object.keys(events).length; i += 1) {
        const currentKey = Object.keys(events)[i];
        const currItem = events[currentKey];

        array.push(currItem);
      }
      this.setState({calendarEvents: array})
    }
    if(currUser != null){
      this.setState({
        userID: currUser.userID,
        userEmail: currUser.userEmail,
        userFirstName: currUser.userFirstName,
        userLastName: currUser.userLastName,
        userYear: currUser.userYear,
        image: currUser.userPic,
      });
    }
  }
  
  
  

  saveInfo = () => {

    var event =  {
      title: this.state.eventTitle,
      start: this.state.eventDateStart,
      end: this.state.eventDateEnd,
      className: 'eType' + this.state.eventType,
    }
    
    db.addCalEvent(
      this.state.userID, 
      this.state.eventTitle+this.state.eventDateStart +":00",
      {
        title: this.state.eventTitle,
        start: this.state.eventDateStart +":00",
        end: this.state.eventDateEnd +":00",
        className: 'eType' + this.state.eventType,
        id: this.state.eventTitle+this.state.eventDateStart +":00",
      },
    )
  
  //this.state.calendarEvents.push(event);

    //reset values
    this.setState({
        eventTitle: '',
        eventDateStart:'',
        eventDateEnd: '',
        eventType:'',
        isOpen: false,
        calID: this.state.calID+1
    });
    db.getCalEvents(this.state.userID, this.setCalInfo);

  }


  render() {
    console.log(this.state.calendarEvents);
    var cal =  <FullCalendar 
    dateClick={this.handleDateClick} 
    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
    header={{
      right: "none",
      center: "title"
    }}
    selectable= {true}
    slotDuration= {'00:30:00'}
    fixedWeekCount = {false}
    />;
    if(this.state.calendarEvents != null && this.state.calendarEvents.length != 0){
     cal = 
      <FullCalendar 
      dateClick={this.handleDateClick} 
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
      header={{
        right: "none",
        center: "title",
        left: "none"
      }}
      selectable= {true}
      slotDuration= {'00:30:00'}
      eventClick = {this.handleEventClick}
      events= {this.state.calendarEvents}
      fixedWeekCount = {false}
    />
    }
    

    return (
      <div className="allCal">
        <div className="navBar">
          <div className="dartCalLogoNav">
              DARTCAL
              <img width="45px" src={logo} style={{'margin-left':'5%', verticalAlign: 'text-top'}}/>
          </div>
          <NavLink to="/searchfriends">
            <img src={search} id='navIcon'></img>
          </NavLink>
          <NavLink to="/profile">
            <img src={userpic} id='navIcon' style={{left:'92%'}}></img>
          </NavLink>
        </div>
      <div className="cal">
        {cal}
      </div>

      <div className="addEventModal">
        <Modal show={this.state.isOpen} save={this.saveInfo} onClose={this.toggleModal}>
        <div className="newEventInfo">
                <div className="inputlinecal"> 
                  Name: &nbsp;
                  <Input type="text" placeholder="Event Name" value={this.state.eventTitle} onChange={this.createEventTitle}/>
                </div>
                <div className="inputlinecal"> 
                  <Input  type="radio" name="eventType" value="Class" onChange={this.createEventType}/>Classes &nbsp;
                  <Input  type="radio" name="eventType"  value="Club" onChange={this.createEventType}/>Clubs &nbsp;
                  <Input  type="radio" name="eventType" value="Social" onChange={this.createEventType}/>Social &nbsp;
                  <Input  type="radio" name="eventType"  value="Other" onChange={this.createEventType}/>Other &nbsp;
                </div>
                <div className="inputlinecal" > 
                  Start Date and Time: 
                  <Input type="datetime-local"value={this.state.eventDateStart} onChange={this.createDateStart}/>
                </div>
                <div className="inputlinecal"> 
                  End Date and Time: 
                  <Input type="datetime-local"  value={this.state.eventDateEnd} onChange={this.createDateEnd}/>
                </div>
            </div>  
        </Modal>
      </div>
      <div className="sidebar">
         <div className="addNewEvent">
            <Button  id="noButton" onClick={this.toggleModal}><img width="40px" src={plus}/> </Button>
            <Button id="noButton" onClick={this.toggleModal} style={{marginTop:'3px'}}>Add Event</Button>
         </div>
         <div className="toggleCalendarView">
           <span style={{fontSize:'28px', marginBottom:'5%'}}>My Calendars</span>

           <label for="checkClasses" style={{background:'#FDE19A'}}>Classes</label>
           <input type="checkbox" id="checkClasses" class="visually-hidden" checked={this.state.showClasses} onChange={this.handleCheckboxChangeClasses}/>
            <br></br>
            <br></br>
           <label for="checkClubs" style={{background:'#9FDBEE'}}>Clubs</label>
           <input type="checkbox" id="checkClubs" class="visually-hidden" checked={this.state.showClubs} onChange={this.handleCheckboxChangeClubs}/>
            <br></br>
            <br></br>
           <label for="checkSocial" style={{background:'#ABCA7E'}}>Social</label>
           <input type="checkbox" id="checkSocial" class="visually-hidden" checked={this.state.showSocial} onChange={this.handleCheckboxChangeSocial}/>
            <br></br>
            <br></br>
           <label for="checkOther" style={{background:'#FDA4A4'}}>Other</label>
           <input type="checkbox" id="checkOther" class="visually-hidden" checked={this.state.showOther} onChange={this.handleCheckboxChangeOther}/>
           {/* <div className="checkbox"> 
            <input id="checkClass" style={{background:'#FDA4A4'}} className="check" type="checkbox" checked={this.state.showClasses} onChange={this.handleCheckboxChangeClasses}></input>
            <label for="checkClass" >Classes</label>
           </div>
           <div className="checkbox"> 
            <input id="checkClubs" className="check" type="checkbox" checked={this.state.showClubs} onChange={this.handleCheckboxChangeClubs}></input> 
            <label for="checkClubs">Clubs</label>
           </div>
           <div className="checkbox"> 
            <input id="checkSocial" className="check" type="checkbox" checked={this.state.showSocial} onChange={this.handleCheckboxChangeSocial}></input>
            <label for="checkSocial">Social</label>
           </div>
           <div className="checkbox"> 
            <input id="checkOther" className="check" type="checkbox" checked={this.state.showOther} onChange={this.handleCheckboxChangeOther}></input> 
            <label for="checkOther">Other</label>
           </div> */}
        </div>
        <div className="friendsCal">
          Friends
          <div style={{flexDirection: 'row', width:'100%'}}>
            <img width="30px" src={plus} style={{float:'left'}}/> 
            <span style={{fontSize:"16px", float:'left', marginTop:'6px'}}>Add Friend Calendar</span>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
NavLink.render(<Calendar />, container);


// export default NewPost;
export default withRouter((Calendar));

