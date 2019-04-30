import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Wishlist extends Component {
  constructor(props){
    super(props)
    this.state ={
      products:[]
    }
  }
  componentDidMount(){
    axios.get(`/api/wishlists/${this.props.wishlist.id}`)
    .then((res) => {
      this.setState({
        products: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

  editWishlistName = () => {
    this.props.onEdit(this.props.wishlist.id)
  }

  deleteWishlist = () => {
    this.props.onDelete(this.props.wishlist.id)
  }

  render() {
    return (
       <Router>
      <div className="wishlist" >
        <span className="deleteButton" onClick={this.deleteWishlist}>
          X
        </span>
        <h1 onClick={this.editWishlistName}> {this.props.wishlist.name}</h1>
        {this.state.products.map(product => (
        <Product product={product} key = {product.id}/>
      ))}
      </div>
      </Router>
    );
  }
}