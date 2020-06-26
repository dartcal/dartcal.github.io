/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/DartCalLogo.png';
import { NavLink, withRouter } from 'react-router-dom';

import '../cssfolder/signin.css';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  handleSigninButtonClick = (event) => {
    // 
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      alert(error);
    });
    // not really sure if this below line works
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/profile');
      }
      else {
        this.props.history.push('/');
      }
    });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
    <div className="allSignIn">
      <div className="dartCalLogoSignIn">
        DartCal
        <img width="90px" src={logo} style={{"vertical-align":"bottom"}}/>
      </div>
      <div className="logininfo">
        <div className="inputline">
          Username: &nbsp; 
          <Input id="emailInputBar" onChange={this.onEmailChange} value={this.state.email} style={{"vertical-align":"top", minWidth:'250px'}}/>
        </div>
        <div className="inputline">
          Password: &nbsp; 
          <Input type="password"  id="passwordInput" onChange={this.onPasswordChange} value={this.state.password} style={{"vertical-align":"top", minWidth:'250px'}}/>
        </div>
        <Button onClick={this.handleSigninButtonClick} style={{"margin-top":"6%", "width":"150px", "height":"50px"}}>Log In</Button>
        <div className="signup">
          New to DartCal? &nbsp; 
          <NavLink to="/signup" style={{"color": "#565C57", "font-weight": "bold"}}>
             Sign Up 
          </NavLink>
        </div>
      </div>
    </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignIn));