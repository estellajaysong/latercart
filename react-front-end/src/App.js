import React, { Component } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
// import Navbar from './Navbar.js';
import Wishlist from './Wishlist.js';
import LoginForm from './LoginForm.js';
import NewWishlistBtn from './NewWishlistBtn.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishlists: [],
      currentWishlistId: null,
      notification: false,
      visible: true
    }
  }

  addWishlist = e => {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'post', 
      url: `/api/wishlists`, 
      data: {
        wishlist: { 
          name: 'My New Wishlist'
        }
      },
      headers: {'Authorization': token }
    })
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
      let token = "Bearer " + localStorage.getItem("jwt");
      axios({
        method: 'put', 
        url: `/api/wishlists/${this.state.currentWishlistId}`, 
        data: {
          wishlist: { 
            name: e.target.value 
          }
        },
        headers: {'Authorization': token }
      })
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
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'delete', 
      url: `/api/wishlists/${id}`, 
      headers: {'Authorization': token }
    })
    .then(response => {
      const index = this.state.wishlists.findIndex(x => x.id === id)
      this.setState({
        wishlists: this.state.wishlists.filter((x, i) => i !== index)
      })
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'get', 
      url: '/api/wishlists', 
      headers: {'Authorization': token }
    })
    .then(response => {
      this.setState({
        wishlists: response.data
      })
    })
    .catch(error => {
      console.log(error)
    }) 
  }

  reloadPage = () => {
    console.log('reloading.......')
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'get', 
      url: '/api/wishlists', 
      headers: {'Authorization': token }
    })
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
      localStorage.getItem("jwt") ? 
      (<div className="App">
        <div className={this.state.notification ? 'showNotification':'noNotification'}>New title saved!</div>
        <div className="wishlists">
        <div className="wishlists-container">
          <NewWishlistBtn addWishlist={this.addWishlist}/>
          {this.state.wishlists.map(wishlist => (
            <Wishlist key={wishlist.id} wishlist={wishlist} onEdit={this.enableEditing} onDelete={this.deleteWishlist} onChange={this.editWishlistName}/> 
          ))}
        </div>
        </div>
      </div>) 
      :
      (<LoginForm />)
    );
  }
}

export default App;