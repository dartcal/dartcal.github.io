/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/DartCalLogo.png';
import background from '../pictures/splashBackground.png';
import connect from '../pictures/connect.png';
import lily from '../pictures/lily.png';
import dylan from '../pictures/dylan.png';
import kat from '../pictures/kat.png';
import scotty from '../pictures/scott.png';
import will from '../pictures/william.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/splashpage.css';




class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userFullName: 'username',
      userYear: 'no year',
    };  
    }

  
  componentDidMount() {
    db.getCurrUser(this.setCurrUser);
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
  }
  

  render() {
    return (
      <div className="allSignIn" style={{height:'250vh'}}>
        <div className="navBar">
            <div className="dartCalLogoNav">
                DartCal
                <img width="45px" src={logo} style={{'margin-left':'5%', verticalAlign: 'text-top'}}/>
            </div>
            <div style={{position:'fixed', left:'75%', top:'1%', width: '25%'}}>
                <NavLink to="/signin" ><Button id="nav" style={{'margin-right':'5%'}}>Log In</Button></NavLink>
                <NavLink to="/signup" ><Button id="nav" style={{'background-color': '#5C9900'}}>Sign Up</Button></NavLink>
            </div>
        </div>
        <div className="landing">
            <div className="tint"></div>
            <img src={background} id="tint" style={{position: 'static', width:'100%', margin:'0%', top: '0%'}}/>
        </div>
        <div className="welcomeBox">
            <h4 style={{position:'relative', top:'-20px'}}>Welcome to DartCal</h4>
            <h5 style={{position:'relative', top:'-50px', fontSize:'24px'}}>a social calendar for a social community</h5>
        </div>
        <div className="splashServices" >
            <h1>Our Services</h1>
            <div className="organizeContainer">
              <img height="100px" src={logo} ></img>
              <h5 id="noMargin">organize</h5>
              <p>A central site to facilitate social, academic, and extra-curricular activities.</p>
            </div>
            <div className="connectContainer">
              <img height="100px" src={connect} ></img>
              <h5 id="noMargin">connect</h5>
              <p>A platform to connect friends across the Dartmouth commmunity.</p>
            </div>
        </div>
        <div className="splashTeam" >
            <h1>Our Team</h1>
            <div className="ourTeam" style={{flexDirection:'row', flexWrap: 'wrap', width:'auto'}}>
              <div className="teamMember">
                  <img src={lily}/>
                  <p style={{fontWeight:'bold'}}>Lily Maechling</p>
                  <p>Founder &#38; </p>
                  <p>Web Developer</p>
              </div>
              <div className="teamMember">
                  <img src={dylan}/>
                  <p style={{fontWeight:'bold'}}>Dylan Bienstock</p>
                  <p>Founder &#38; </p>
                  <p>Web Developer</p>
              </div>
              <div className="teamMember">
                  <img src={kat}/>
                  <p style={{fontWeight:'bold'}}>Katherine Lasonde</p>
                  <p>Founder &#38; </p>
                  <p>Web Developer</p>
              </div>
              <div className="teamMember">
                  <img src={scotty}/>
                  <p style={{fontWeight:'bold'}}>Scott Gibbons</p>
                  <p>Founder &#38; </p>
                  <p>Web Developer</p>
              </div>
              <div className="teamMember">
                  <img src={will}/>
                  <p style={{fontWeight:'bold'}}>William Perez</p>
                  <p>UI/UX Designer</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}


export default withRouter((SplashPage));