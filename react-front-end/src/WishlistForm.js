import React, { Component } from 'react'
// import axios from 'axios'

class WishlistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.wishlist.name,
    }
  }

  // editWishlistName = e => {
  //   e.preventDefault()
  //   this.setState({
  //     name: e.target.value,
  //   })
  // }

  // deleteWishlist = () => {
  //   this.props.onDelete(this.props.wishlist.id)
  // }

  // saveWishlistName = e => {
  //   e.preventDefault();
  //   axios.put(`/api/wishlists/${this.props.wishlist.id}`, {wishlist: { name: this.state.name }})
  //   .then(response => {
  //     console.log(response)
  //     this.setState({
  //       notification: 'New title saved!'
  //     }, () => setTimeout(
  //       () => this.setState({
  //         notification: ''
  //       }),2000))
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

  render() {
    return (
      <div className="wishlist" >
        <input className='input' type="text"
            name="name" placeholder={this.props.wishlist.name} onBlur={this.props.editWishlistName} />
      </div>
    );
  }
}

export default WishlistForm