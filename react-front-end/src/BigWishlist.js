import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class BigWishlist extends Component {
  constructor(props){
    super(props)
    this.state ={
      product:[],
    }
  }

  componentDidMount(){
    // console.log(this.props.match.params.id)
    axios.get(`/api/wishlists/${this.props.match.params.id}`)
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
      <Link to={`/products/${prod.id}`}>{prod.name}</Link>
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