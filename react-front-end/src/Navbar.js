import React, { Component } from 'react';
// import axios from 'axios';
// import LoginForm from './LoginForm.js';
// import Logout from './Logout.js';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import logo from './img/wishlist.png'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).sub : null,
      currentUserName: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).name : null,
      currentUserEmail: null
    }
  }
  theme = createMuiTheme({
    palette: {
      primary: orange,
      secondary: purple,
    },
  });

  logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <AppBar position="static" className="nav" >
          <Toolbar>
            <img src={logo} className="logo"/>
            <Typography variant="h5" style={{flexGrow: 1}}>
              LaterCart
            </Typography>
            {this.state.currentUserName}
            {localStorage.getItem("jwt") ? 
            <Button className="logoutBtn"  onClick={this.logout}>Logout</Button> : null }
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    )
  }
}
