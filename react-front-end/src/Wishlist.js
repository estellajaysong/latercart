import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <Router>
      <div className="App">
      <Link to="/product">Product</Link>
       <Product />
       <Product />
       <Product />
       <Route path="/product" component={Product} />
      </div>
      </Router>
    );
  }
}