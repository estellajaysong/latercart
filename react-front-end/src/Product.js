import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Wishlist from './Wishlist.js'


export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {}
    }
  }

  // componentDidMount(){
  //     axios.get(`/api/products/${this.props.product.id}`) // You can simply make your requests to "/api/whatever you want"
  //     .then((response) => {
  //       console.log(response.data) // The entire response from the Rails API  
  //       this.setState({
  //         product: response.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log("here")
  //       console.log(err)
  //     })
  // }

  

  render() {
    return (
      <Router>
      <div className="product">
      <div>
      <Link to="/product/:productId">Product</Link>
      <h4>{this.props.product.name}</h4>
      <img className="product-img" src={this.props.product.img_url} alt={this.props.product.name} />
      </div>
      <Route path="/product/:productId" component={Product} />
      <div>
      <p>Price: ${this.props.product.price}</p>
      <p>Rating: {this.props.product.rating}</p>
      <p>Notes: {this.props.product.notes}</p>
      <p>Date Added: {this.props.product.created_at}</p>
      <a href={this.props.product.url}>Buy now</a>
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