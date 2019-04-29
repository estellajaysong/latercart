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
    axios('/api/user_token', {
      method: "post",
      data: {auth: {
          email: e.target.elements.email.value, 
          password: e.target.elements.password.value
        }}
    })
    // axios.post('/api/login', {userInfo: {
    //   email: e.target.elements.email.value, 
    //   password: e.target.elements.password.value
    // }})
    .then(response => {
      localStorage.setItem("jwt", response.data.jwt);
      // console.log('>>>>>>>>>>>>>',JSON.parse(response.config.data).auth.email)
      this.setState({
        // currentUserId: response.data.id,
        // userName: response.data.username,
        userEmail: JSON.parse(response.config.data).auth.email
      })
      // send the user to the home path when they log in
      this.props.history.push("/")
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="login-container">
        <div>{this.state.userEmail}</div>
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
