import React, { Component } from 'react';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: null,
      userName: null,
      userEmail: this.props.currentUserEmail
    }
  }

  render() {
    return (
      <div className="login-container">      
        <form onSubmit={this.props.login}> 
          <input className='input' type="text" name="email" placeholder='example@example.com' />
          <input className='input' type="text" name="password" placeholder='Your Password' />
          <button type='submit' className="loginBtn" >
            Login 
          </button>
        </form>
      </div>
    )
  }
}
