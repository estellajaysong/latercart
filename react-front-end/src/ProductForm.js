import React, { Component } from 'react'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.product.name,
    }
  }

  render() {
    return (
      <div className="product" >
        <input className='input-name' type="text" name="name" placeholder={this.props.product.name} onBlur={this.props.editProductName} />
        <input className='input-img' type="text" name="img" placeholder={this.props.product.img_url} onBlur={this.props.editProductName} />
        <input className='input-price' type="text" name="price" placeholder={this.props.product.price} onBlur={this.props.editProductName} />
        <input className='input-notes' type="text" name="notes" placeholder={this.props.product.notes} onBlur={this.props.editProductName} />
        <input className='input-rating' type="text" name="rating" placeholder={this.props.product.text} onBlur={this.props.editProductName} />
      </div>
    );
  }
}

export default ProductForm