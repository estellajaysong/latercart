import React, { Component } from 'react'
import ShareForm from './ShareForm.js';
// import axios from 'axios'

class WishlistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.wishlist.name,
      showShareForm: false,
      showDelete: true
    }
  }

  deleteWishlist = () => {
    this.props.onDelete(this.props.wishlist.id)
  }

  toggleShare = () => {
    this.setState({
      showShareForm: !this.state.showShareForm,
      showDelete: !this.state.showDelete
    })
  }


  render() {
    return (
      <div className="wishlist" >
        <input className='input' type="text" name="name" placeholder={this.props.wishlist.name} onBlur={this.props.editWishlistName} />
        <footer>
          <span className="shareButton" onClick={this.toggleShare}>
            Share
          </span>
          {this.state.showShareForm ?  <ShareForm wishlist={this.props.wishlist}/> : null} 
          {this.state.showDelete ? 
          <span className="deleteButton" onClick={this.deleteWishlist}>
            X
          </span> : null}
        </footer>
      </div>
    );
  }
}

export default WishlistForm