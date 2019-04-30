import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Wishlist from './Wishlist.js'


export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {}
    }
  }

  componentDidMount(){
      axios.get('/api/products#index',{params: {id: this.state.product.id}}) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // console.log(response.data) // The entire response from the Rails API  
        this.setState({
          product: response.data
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  

  render() {
    return (
      <Router>
      <div className="product">
      <div>
      <Link to="/product">Product</Link>
      <h4>{this.state.product.name}</h4>
      <img className="product-img" src={this.state.product.img_url} alt={this.state.product.name} />
      </div>
      <Route path="/product" component={Product} />
      <div>
      <p>Price: ${this.state.product.price}</p>
      <p>Rating: {this.state.product.rating}</p>
      <p>Notes: {this.state.product.notes}</p>
      <p>Date Added: {this.state.product.created_at}</p>
      <a href={this.state.product.url}>Buy now</a>
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