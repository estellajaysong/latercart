import React, { Component } from 'react'
import axios from 'axios'

class WishlistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.wishlist.name
    }
  }

  editWishlistName = e => {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  saveWishlistName = e => {
    e.preventDefault()
    axios.put(`/api/wishlists/${this.props.wishlist.id}`, {wishlist: { name: this.state.name }})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="wishlist" >
        <form onBlur={this.saveWishlistName}>
          <input className='input' type="text"
            name="name" placeholder='Enter a Title' value={this.state.name} onChange={this.editWishlistName} ref={this.props.nameRef} />
        </form>
      </div>
    );
  }
}

export default WishlistForm