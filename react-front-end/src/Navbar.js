import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm.js';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // message: 'Click the button to load data!'
      showMenu: false
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

  render() {
    return (
      <div className="Navbar">
        <h1>latercart</h1>
        <h1>My lists</h1>
        <h1>User</h1>
        <LoginForm />
      </div>
    );
  }
}