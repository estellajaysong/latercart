import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Navbar from './Navbar.js';
import axios from 'axios';
import ProductForm from './ProductForm.js';

export default class BigWishlist extends Component {
  constructor(props){
    super(props)
    this.state ={
      product:[],
      loadOnce: false,
      currentProductId: null,
    }
  }

  componentDidMount(){
    axios.get(`/api/wishlists/${this.props.id}`)
    .then((res) => {
      this.setState({
        product: res.data,
        loadOnce:true
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteProduct = (e) => {
    e.preventDefault()
    axios.delete(`/api/products/${e.target.id}`)
  }

  toggleForm = (e) => {
    e.preventDefault()
    this.setState({currentProductId:e.target.id})
  }

  render() {
    return (
      <Router>
        <Navbar/>
        <Link to="/">Back</Link>
        {this.state.product.map(prod=> (
          this.state.currentProductId === prod.id.toString() ?
          <ProductForm product = {prod}/>: 
      <div className="bigproduct" key={prod.name}>
      <Link to="/product/1">{prod.name}</Link>
      <img className="product-img" src={prod.img_url} alt={prod.name} />
      <p>Price: {prod.price}</p>
      <p>{prod.id}</p>
      <p>Rating: {prod.rating}</p>
      <p>Notes: {prod.note}</p>
      <p>Date Added: {prod.created_at}</p>
      <a href={prod.url}>Buy now</a>
      <button type="button" id={prod.id} onClick={this.toggleForm} >EDIT</button>
      <button type="button" id={prod.id} onClick={this.deleteProduct} >DELETE</button>
      </div>
        ))}
      </Router>
    );
  }
}