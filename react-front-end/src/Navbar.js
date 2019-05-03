import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';

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
    return (<div className="navbar">
    <Link to="/"><h1>latercart</h1></Link>
    <Link to="/wishlists/1">Wishlists</Link>
    <Link to="/products/2">Products</Link>
    <h3>{this.state.currentUserName}</h3> </div>
    )

  }
}


