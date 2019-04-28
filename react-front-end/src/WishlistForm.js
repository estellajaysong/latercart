import React, { Component } from 'react'
// import axios from 'axios'

class WishlistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.wishlist.name,
    }
  }

  // deleteWishlist = () => {
  //   this.props.onDelete(this.props.wishlist.id)
  // }

  render() {
    return (
      <div className="wishlist" >
        <input className='input' type="text" name="name" placeholder={this.props.wishlist.name} onBlur={this.props.editWishlistName} />
      </div>
    );
  }
}

export default WishlistForm