import React, { Component } from 'react';
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
// import logo from './img/wishlist.png'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).sub : null,
      currentUserName: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).name : null,
      currentUserEmail: null
    }
  }

  logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  render() {
    return (
        <AppBar position="static" className="nav">
          <Toolbar>
          <Link to="/"><Typography variant="h5" style={{flexGrow: 3}}>
              LaterCart
            </Typography></Link>
            <div className="user-info">
              {this.state.currentUserName}
              {localStorage.getItem("jwt") ? 
              <Button className="logoutBtn"  onClick={this.logout}>Logout</Button> : null }
            </div>
          </Toolbar>
        </AppBar>
    )
  }
}
