import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';

export default class BigWishlist extends Component {
  constructor(props){
    super(props)
    this.state ={
      product:[],
    }
  }

  componentDidMount(){
    axios.get(`/api/wishlists/${this.props.id}`)
    .then((res) => {
      this.setState({
        product: res.data,
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        {this.state.product.map(prod=> (
      <div className="bigproduct" key={prod.name}>
      <Link to="/products/1">{prod.name}</Link>
      <img className="product-img" src={prod.img_url} alt={prod.name} />
      <p>Price: {prod.price}</p>
      <p>{prod.id}</p>
      <p>Rating: {prod.rating}</p>
      <p>Notes: {prod.note}</p>
      <p>Date Added: {prod.created_at}</p>
      </div>
        ))}
      </div>
    );
  }
}