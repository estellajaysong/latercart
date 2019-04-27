import React, { Component } from 'react';
import axios from 'axios';
// import './App.css';

export default class Product extends Component {
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
      <div className="product">
      <div>
      <h4>Product Name: </h4>
      <img className="product-img" src="https://www.sephora.com/productimages/sku/s2137289-main-grid.jpg "/>
      </div>
      <div>
      <p>Price: </p>
      <p>Notes: </p>
      <p>Date Added: </p>
      <a href="#">Buy now</a>
      </div>
      <div>
        <a href="#">Back</a>
        </div>
      </div>
    );
  }
}