import React, { Component } from 'react';
// import axios from 'axios';
import Product from './Product.js';
// import { BrowserRouter, Route, Link } from "react-router-dom";


export default class Wishlist extends Component {
  editWishlistName = () => {
    this.props.onEdit(this.props.wishlist.id)
  }

  deleteWishlist = () => {
    this.props.onDelete(this.props.wishlist.id)
  }

  render() {
    return (
      <div className="wishlist" >
        <span className="deleteButton" onClick={this.deleteWishlist}>
          X
        </span>
        <h2 onClick={this.editWishlistName} >{this.props.wishlist.name}</h2>
      <Product />     
      </div>
    );
  }
}