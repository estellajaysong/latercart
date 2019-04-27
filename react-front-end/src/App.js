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
    console.log(e.target.elements.newWishlist.value)
    // const formData = new FormData()
    // formData.set('name', 'Fred')
    axios.post('/api/wishlists', {newWishlsitName: e.target.elements.newWishlist.value})
    .then((response) => {
      console.log(response)
    }).catch(function (error) {
      // handle error
      console.log(error)
    }) 
  }

  componentDidMount() {
    axios.get('/api/wishlists') // load all the wishlists from rails api
    .then((response) => {
      // handle success
      // console.log(response.data)// The entire response from the Rails API
      // console.log(response.data.wishlists.length) // Just the message
      this.setState({
        wishlists: this.state.wishlists.concat(response.data.wishlists)
      })
    }).catch(function (error) {
      // handle error
      console.log(error)
    }) 
  }

  render() {
    return (
      <div className="App">
        < Navbar />
        <h1>My wishlists</h1>
        Add new wishlist 
        <form onSubmit={this.addWishlist}>
          <input name="newWishlist" placeholder="Type a message and hit ENTER" />  
          <button type="submit">Add</button>
        </form>
        {this.state.wishlists.map(wishlist => (
          <Wishlist key={wishlist.id} wishlist={wishlist}/>
        ))}
      </div>
    );
  }
}

export default App;