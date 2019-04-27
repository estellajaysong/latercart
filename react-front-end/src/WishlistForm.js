import React, { Component } from 'react'
import axios from 'axios'

class WishlistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="wishlist">
        <form>
          <input className='input' type="text"
            name="name" placeholder='Enter a Title' />
        </form>
      </div>
    );
  }
}

export default WishlistForm