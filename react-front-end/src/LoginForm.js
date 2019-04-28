import React, { Component } from 'react';
import axios from 'axios';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null
    }
  }

  login = e => {
    e.preventDefault()
    axios.post('/api/login', {userInfo: {
      email: e.target.elements.email.value, 
      password: e.target.elements.password.value
    }})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.login}> 
          <input className='input' type="text" name="email" placeholder='example@example.com' />
          <input className='input' type="text" name="password" placeholder='Your Password' />
          <button className="loginBtn" >
            Login 
          </button>
        </form>
      </div>
    )
  }
}
