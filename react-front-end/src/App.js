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
      currentWishlistId: null,
      notification: false
    }
  }

  addWishlist = e => {
    axios.post('/api/wishlists', {wishlist: {name: 'My New Wishlist'}})
    .then(response => {
      console.log(response)
      this.setState({
        wishlists: [response.data, ...this.state.wishlists],
        currentWishlistId: response.data.id
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  enableEditing = (id) => {
    this.setState({
      currentWishlistId: id
    })
  }

  editWishlistName = e => {
    e.persist()
    // if (e.key === 'Enter'){
      console.log(e.target.value)
      axios.put(`/api/wishlists/${this.state.currentWishlistId}`, {wishlist: { name: e.target.value }})
      .then(response => {
        // console.log(response)
        const index = this.state.wishlists.findIndex(x => x.id === this.state.currentWishlistId)
        let wishlistsCopy = JSON.parse(JSON.stringify(this.state.wishlists))
        wishlistsCopy[index].name = e.target.value
        this.setState({
          wishlists: wishlistsCopy,
          notification: true
        })

        setTimeout(() => this.setState({
          notification: false
        }),3000)

      })
      .catch(error => {
        console.log(error)
      })
    // } 
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
      this.setState({
        wishlists: response.data
      })
    })
    .catch(error => {
      console.log(error)
    }) 
  }

  render() {
    return (
      <div className="App">
        < Navbar />
        <div className={this.state.notification ? 'showNotification':'noNotification'}>New title saved!</div>
        <div className="wishlists">
        <button className="newWishBtn" onClick={this.addWishlist}>
          + <br/> <div className="newWishBtnFont">New Wishlist</div>
        </button>
        <div className="wishlists-container">
          {this.state.wishlists.map(wishlist => (
            this.state.currentWishlistId === wishlist.id ? 
            <WishlistForm key={wishlist.id} wishlist={wishlist} editWishlistName={this.editWishlistName} /> :
            <Wishlist key={wishlist.id} wishlist={wishlist} onEdit={this.enableEditing} onDelete={this.deleteWishlist}/> 
          ))}
        </div>
        </div>
      </div>
    );
  }
}

export default App;