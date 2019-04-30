import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm.js';
import Logout from './Logout.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // message: 'Click the button to load data!'
      showMenu: false, 
      currentUserEmail: null
    }
    this.showMenu = this.showMenu.bind(this);

  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({
      showMenu: true,
    });
  }

  login = e => {
    console.log('here')
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
      console.log('jwt>>>>>>>>>>>>>',response.data.jwt)
      let decodedToken = jwtDecode(response.data.jwt)
      console.log(decodedToken)
      this.setState({
        currentUserId: decodedToken.sub,
        userName: decodedToken.name,
        currentUserEmail: JSON.parse(response.config.data).auth.email
      })
      // load the wishlists after login
      this.props.reloadPage()
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <Router>
        <div className="Navbar">
          <h1>latercart</h1>
          <h1>My lists</h1>
          <h1>User</h1>
          <h3>{this.state.userName}</h3>
          <Link to="/login/">Login</Link>
          <Link to="/logout/">Logout</Link>
          <Route path="/login/" render={(props) => <LoginForm {...props} login={this.login} />} />
          <Route path="/logout/" render={(props) => <Logout {...props} reloadPage={this.props.reloadPage} />}  />
        </div>
      </Router>
    );
  }
}