import React, { Component } from 'react';
import axios from 'axios';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: null,
      userName: null,
      userEmail: null
    }
  }

  login = e => {
    e.preventDefault()
    axios('/api/login', {
      method: "post",
      data: {userInfo: {
        email: e.target.elements.email.value, 
        password: e.target.elements.password.value
      }},
      withCredentials: true
    })
    // axios.post('/api/login', {userInfo: {
    //   email: e.target.elements.email.value, 
    //   password: e.target.elements.password.value
    // }})
    .then(response => {
      console.log('>>>>>>>>>>>>>',response)
      this.setState({
        currentUserId: response.data.id,
        userName: response.data.username,
        userEmail: response.data.email
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="login-container">
        <div>{this.state.userName}</div>
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
