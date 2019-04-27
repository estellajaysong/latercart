import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar.js';
import Wishlist from './Wishlist.js';
import WishlistForm from './WishlistForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishlists: [],
      editingWishlistId: null,
    }
  }

  addWishlist = e => {
    e.preventDefault()
    // console.log(e.target.elements.newWishlist.value)
    // const formData = new FormData()
    // formData.set('name', 'Fred')
    // const newWishlistName = e.target.elements.newWishlist.value
    axios.post('/api/wishlists', {wishlist: {name: 'My New Wishlist'}})
    .then(response => {
      console.log(response)
      this.setState({
        wishlists: [response.data, ...this.state.wishlists],
        editingWishlistId: response.data.id
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  enableEditing = (id) => {
    this.setState({
      editingWishlistId: id},
      () => { this.name.focus() }
    )
  }

  deleteWishlist = (id) => {
    axios.delete(`/api/wishlists/${id}`)
    .then(response => {
      const index = this.state.wishlists.findIndex(x => x.id === id)
      this.setState({
        wishlists: this.state.wishlists.filter((x, i) => i !== index)
      })
    })
    .catch(error => console.log(error))
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
    })
    .catch(error => {
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
          +
        </button>
        <div className="wishlists-container">
          {this.state.wishlists.map(wishlist => (
            this.state.editingWishlistId === wishlist.id ? 
            <WishlistForm key={wishlist.id} wishlist={wishlist} nameRef= {input => this.name = input}/> :
            <Wishlist key={wishlist.id} wishlist={wishlist} onEdit={this.enableEditing} onDelete={this.deleteWishlist}/> 
          ))}
        </div>
        </div>
      </div>
    );
  }
}

export default App;