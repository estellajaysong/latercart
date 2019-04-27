import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Wishlist from './Wishlist.js';
import Navbar from './Navbar.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishlists: []
    }
  }

  addWishlist = e => {
    e.preventDefault()
    // console.log(e.target.elements.newWishlist.value)
    // const formData = new FormData()
    // formData.set('name', 'Fred')
    // const newWishlistName = e.target.elements.newWishlist.value
    axios.post('/api/wishlists', {wishlist: {name: 'test'}})
    .then(response => {
      console.log(response)
      this.setState({
        wishlists: [response.data, ...this.state.wishlists]
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    axios.get('/api/wishlists') // load all the wishlists from rails api
    .then(response => {
      // handle success
      // console.log(response.data)// The entire response from the Rails API
      // console.log(response.data.wishlists.length) // Just the message
      this.setState({
        wishlists: response.data
      })
    }).catch(error => {
      // handle error
      console.log(error)
    }) 
  }

  render() {
    return (
      <div className="App">
        < Navbar />
        <div className="wishlists">
        <button className="newWishBtn" onClick={this.addWishlist}>
          New Wishlist
        </button>
        <div className="wishlists-container">
          {this.state.wishlists.map(wishlist => (
            <Wishlist key={wishlist.id} wishlist={wishlist}/>
          ))}
        </div>
        </div>
      </div>
    );
  }
}

export default App;