import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar.js';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).sub : null,
      currentUserName: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).name : null,
      currentUserEmail: null
    }
  }
  login = e => {
    e.preventDefault()
    axios('/api/user_token', {
      method: "post",
      data: {auth: {
          email: e.target.elements.email.value, 
          password: e.target.elements.password.value
        }}
    })
    .then(response => {
      localStorage.setItem("jwt", response.data.jwt);
      //console.log('jwt>>>>>>>>>>>>>',response.data.jwt)
      let decodedToken = jwtDecode(response.data.jwt)
      //console.log(decodedToken)
      this.setState({
        currentUserId: decodedToken.sub,
        currentUserName: decodedToken.name,
        currentUserEmail: JSON.parse(response.config.data).auth.email
      })
      // load the wishlists after login
      window.location.reload();
      // this.props.reloadPage()
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <React.Fragment>
        < Navbar/>
        <div className="login-container" >   
        <br/><br/>   
          <form onSubmit={this.login}> 
            <TextField className='input' name="email" label="Your Email"/>
            <br/><br/>
            <TextField className='input' name="password" label='Your Password' />
            <br/><br/>
            <Button type='submit' variant="outlined" className="loginBtn" >
              Login 
            </Button>
          </form>
        </div>
    </React.Fragment>
    )
  }
}
