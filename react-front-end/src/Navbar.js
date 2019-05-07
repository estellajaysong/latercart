import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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
          <Toolbar >
          <Link to="/" style={{ textDecoration: 'none' }}><Typography variant="h5" >
          <span style={{color: '#F0C951'}}>later</span><span style={{color: 'white'}}>cart</span>
            </Typography></Link>
            <div className="user-info" style={{marginLeft:'80%'}}>
              {this.state.currentUserName}
              {localStorage.getItem("jwt") ? 
              <Button className="logoutBtn"  onClick={this.logout} style={{color: '#E1B8B1', marginTop:'-3.25px'}}>Logout</Button> : null }
            </div>
          </Toolbar>
        </AppBar>
    )
  }
}
