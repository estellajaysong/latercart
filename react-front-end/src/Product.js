import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Wishlist from './Wishlist.js'

const prod = {name:"HUDA BEAUTY The New Nude Eyeshadow Palette",
img: "https://www.sephora.com/"+"/productimages/sku/s2137289-main-Lhero.jpg",
price: 85}

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = { product: prod
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
      <div className="product">
      <div>
      <Link to="/product">Product</Link>
      <h4>Product Name: {this.state.product.name}</h4>
      <img className="product-img" src={this.state.product.img}/>
      </div>
      <Route path="/product" component={Product} />
      <div>
      <p>Price: {this.state.product.price}</p>
      <p>Notes: </p>
      <p>Date Added: </p>
      <a href={this.state.product.img}>Buy now</a>
      </div>
      <div>
        <Link to="/wishlist">Back</Link>
        </div>
        <Route path="/wishlist" component={Wishlist} />

      </div>
      </Router>
    );
  }
}