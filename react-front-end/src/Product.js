import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Product extends Component {
  //  <Route path="/product/:product" render={(props) => <BigProduct {...props} product={this.props.product}/>}/>

  render() {
    return (
      <div className="product">
        <Link to={`/products/${this.props.product.id}`} >{this.props.product.name}</Link>
        <div><img className="product-img" src={this.props.product.img_url} alt={this.props.product.name} /></div>
      </div>)
  }
}