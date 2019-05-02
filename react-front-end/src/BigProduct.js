import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Navbar from './Navbar.js';
import axios from 'axios';

export default class BigProduct extends Component {
  constructor(props){
    super(props)
    this.state ={
      product:[]
    }
  }

  componentDidMount(){

    axios.get(`/api/products/${this.props.id}`)
    .then((res) => {
      let id = this.props.id
      console.log(id)
      this.setState({
        product: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })

  }

  render() {
    return (
      <Router>
        <Navbar/>
       
      <div className="bigproduct" key={this.state.product.name}>
      <Link to="/wishlists/1">Back</Link>
      <h1>{this.state.product.name}</h1>
      <img className="product-img" src={this.state.product.img_url} alt={this.state.product.name} />
      <p>Price: {this.state.product.price}</p>
      <p>Rating: {this.state.product.rating}</p>
      <p>Notes: {this.state.product.notes}</p>
      <p>Date Added: {this.state.product.created_at}</p>
      <a href={this.state.product.url}>Buy now</a>
      </div>
      
      </Router>
    );
  }
}