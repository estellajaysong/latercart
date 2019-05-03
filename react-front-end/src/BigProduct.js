import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import ProductForm from './ProductForm.js';


export default class BigProduct extends Component {
  constructor(props){
    super(props)
    this.state ={
      product:[],
      currentProductId: null,
    }
  }

  componentDidMount(){
    axios.get(`/api/products/${this.props.match.params.id}`)
    .then((res) => {
      this.setState({
        product: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })

  }

  deleteProduct = (e) => {
    e.preventDefault()
    axios.delete(`/api/products/${e.target.id}`)
    .then(<Redirect to="/"></Redirect>)
  }

  toggleForm = (e) => {
    e.preventDefault()
    this.setState({currentProductId:e.target.id})
    return <ProductForm product = {this.state.product}/>
  }

  render() {
    return (
      <div>
        {this.state.currentProductId && <ProductForm product = {this.state.product}/>}
      {!this.state.currentProductId && <div className="bigproduct" key={this.state.product.name}>
      <Link to={`/wishlists/${this.state.product.wishlist_id}`}>Back</Link>
      <h1>{this.state.product.name}</h1>
      <img className="product-img" src={this.state.product.img_url} alt={this.state.product.name} />
      <p>Price: {this.state.product.price}</p>
      <p>Rating: {this.state.product.rating}</p>
      <p>Notes: {this.state.product.note}</p>
      <p>Date Added: {this.state.product.created_at}</p>
      <a href={this.state.product.url}>Buy now</a>
      <button type="button" id={this.state.product.id} onClick={this.toggleForm} >EDIT</button>
      <button type="button" id={this.state.product.id} onClick={this.deleteProduct} >DELETE</button>
      </div>}
      </div>
    );
  }
}