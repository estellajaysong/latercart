import React, { Component } from 'react'
import axios from 'axios';


class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.product.id,
      name: this.props.product.name,
      img_url: this.props.product.img_url,
      price: this.props.product.price,
      rating: this.props.product.rating,
      note: this.props.product.note
    }
  }

  onChange = (e) =>{
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  editProduct = (e) => {
    e.preventDefault()
    axios.put(`/api/products/${this.state.id}`, {product:this.state})
  }

  render() {
    const {name, img_url, price, rating, note} = this.state
    return (
      <div className="product" >
      <div>
      <h4>Product name: </h4>
        <input className='input-name' type="text" name="name" value = {name} onChange={this.onChange} />
      </div>
      <div>
      <img className="product-img" src={img_url} alt={name} />
        <h4>Image URL: </h4>
        <input className='input-img' type="text" name="img_url" value = {img_url} onChange={this.onChange} />
      </div>
        <div>
        <h4>Price</h4>
        <input className='input-price' type="text" name="price" value = {price} onChange={this.onChange} />
        <h4> Notes</h4>
        <input className='input-notes' type="text" name="note" value = {note} onChange={this.onChange} />
        <h4>Rating</h4>
        <input className='input-rating' type="text" name="rating" value={rating} onChange={this.onChange} />
        <button type="button" id={this.props.product.id} onClick={this.editProduct} >Submit</button>
        </div>
        

      </div>
    );
  }
}

export default ProductForm