import React, { Component } from 'react';
// import axios from 'axios';
import Product from './Product.js';
// import { BrowserRouter, Route, Link } from "react-router-dom";


export default class Wishlist extends Component {
  editWishlistName = () => {
    this.props.onClick(this.props.wishlist.id)
  }

  render() {
    return (
      <div className="wishlist" onClick={this.editWishlistName}>
        <h2>{this.props.wishlist.name}</h2>
      <Product />     
      </div>
    );
  }
}