import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar.js';

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

  // reloadPage = () => {
  //   console.log('reloading.......')
  //   let token = "Bearer " + localStorage.getItem("jwt");
  //   axios({
  //     method: 'get', 
  //     url: '/api/wishlists', 
  //     headers: {'Authorization': token }
  //   })
  //   .then(response => {
  //     this.setState({
  //       wishlists: response.data
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   }) 
  // }

  render() {
    return (
      <div className="App">
      < Navbar/>
        <div className="login-container">      
          <form onSubmit={this.login}> 
            <input className='input' type="text" name="email" placeholder='example@example.com' />
            <input className='input' type="text" name="password" placeholder='Your Password' />
            <button type='submit' className="loginBtn" >
              Login 
            </button>
          </form>
        </div>
      </div>
    )
  }
}
