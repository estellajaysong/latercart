import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import BigProduct from './BigProduct';
// import Wishlist from './Wishlist.js'
// import ReactDOM from 'react-dom';

const Child = ({match}) => (
  <BigProduct id={match.params}/>
)

export default class Product extends Component {
  
  // window.location.reload()
//  render={(props) => <Redirect to= "/product/1"
//  <Route path="/product/:product" render={(props) => <BigProduct {...props} product={this.props.product}/>}/>

  render() {
    return (<Router>
      <div className="product">
      <Link to={`/product/${this.props.product.id}`} >{this.props.product.name}</Link>
      <div><img className="product-img" src={this.props.product.img_url} alt={this.props.product.name} /></div>
      <Route path="/product/:id" component={Child} />
      </div>
      </Router>)
      
  }
}