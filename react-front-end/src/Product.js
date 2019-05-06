import React, { Component } from 'react';

export default class Product extends Component {
  //  <Route path="/product/:product" render={(props) => <BigProduct {...props} product={this.props.product}/>}/>

  render() {
    return (
      <div className="product" >
        <img className="product-img" src={this.props.product.img_url} alt={this.props.product.name} />
      </div>)
  }
}