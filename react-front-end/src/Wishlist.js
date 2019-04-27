import React, { Component } from 'react';
// import axios from 'axios';
import Product from './Product.js';
// import { BrowserRouter, Route, Link } from "react-router-dom";


export default class Wishlist extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     // message: 'Click the button to load data!'
  //   }
  // }

  // fetchData = () => {
  //   axios.get('/') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log("success", response.data) // The entire response from the Rails API

  //     console.log(response.data.message) // Just the message
  //     this.setState({
  //       message: response.data.message
  //     });
  //   }) 
  // }

  render() {
    return (

        <div className="wishlists">
          {this.props.wishlist.name}
        <Product />     
        </div>

    );
  }
}