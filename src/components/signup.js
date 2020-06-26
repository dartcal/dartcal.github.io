/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import '../cssfolder/signup.css';
import logo from '../pictures/DartCalLogo.png';
import * as db from './datastore';

import '../cssfolder/signup.css';

class SignUp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      email: '',
      userID: '',
      firstusername: '',
      lastusername: '',
      password: '',
      passwordTwo: '',
      userYear: '',
      image: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onImageChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  onPasswordTwoChange= (event) => {
    this.setState({ passwordTwo: event.target.value });
  }

  onFirstUsernameChange= (event) => {
    this.setState({ firstusername: event.target.value });
  }

  onLastUsernameChange= (event) => {
    this.setState({ lastusername: event.target.value });
  }

  onUserYearChange= (event) => {
    this.setState({ userYear: event.target.value });
  }


  handleSignupButtonClick = (event) => {
    if ((this.state.email.endsWith('@dartmouth.edu') || this.state.email.endsWith('@Dartmouth.edu')) && this.state.password === this.state.passwordTwo) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        alert(error);
        alert("Please make sure that your sign up meets all of the following criteria: \n 1. Using a @dartmouth.edu email \n 2. Passwords are at least 6 characters \n 3. Passwords match ")
      });
    
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        db.createUser(
          user.uid, this.state.email, this.state.firstusername,
          this.state.lastusername, this.state.userYear,)
    
          console.log('pushing history');
          this.props.history.push('/profile');
        }
      });
    } else if (!this.state.email.endsWith('@dartmouth.edu')) {
      alert('Please enter a dartmouth.edu email');
    } else {
      alert('Make sure passwords match and are greater than six characters');
    }
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="allSignUp">
        <div className="dartCalLogoSmall">
          DARTCAL
          <img width="80px" src={logo} style={{"vertical-align":"bottom"}}/>
        </div>
          <div className="signupnameContainer">
            <h6>First Name:</h6>
            <h6>Last Name:</h6>
            <h6>Email:</h6>
            <h6>Password:</h6>
            <h6>Re-Enter Password:</h6>
            <h6>Year:</h6>
          </div>
          <div className="signupinputContainer">
            <div className="signupindivInput">
              <h6><Input placeholder="YOUR FIRST NAME HERE" className="signup" onChange={this.onFirstUsernameChange} value={this.state.firstusername} /></h6>
            </div>
            <div className="signupindivInput">
              <h6><Input  placeholder="YOUR LAST NAME HERE" className="signup" onChange={this.onLastUsernameChange} value={this.state.lastusername} /></h6>
            </div>
            <div className="signupindivInput">
              <h6><Input placeholder="NAME.YEAR@DARTMOUTH.EDU" className="signup" onChange={this.onEmailChange} value={this.state.email} /></h6>
            </div>
            <div className="signupindivInput">
              <h6><Input type="password"  id="passwordInput"  className="signup" placeholder="AT LEAST 6 CHARACTERS" onChange={this.onPasswordChange} value={this.state.password} /></h6>
            </div>
            <div className="signupindivInput">
              <h6><Input type="password"  id="passwordInput" className="signup" placeholder="AT LEAST 6 CHARACTERS" onChange={this.onPasswordTwoChange} value={this.state.passwordTwo} /></h6>
            </div>
            <div className="signupindivInput">
              <h6><Input type="classYear"  id="classYear" className="signup" placeholder="CLASS YEAR" onChange={this.onUserYearChange} value={this.state.userYear}/></h6>
            </div>
          </div>
          <div className="signuporcancelbuttons">
            <Button  id="createButton" onClick={this.handleSignupButtonClick}>Create User</Button> &nbsp; 
          </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignUp));