import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Wishlist from './Wishlist.js';
// import Navbar from './Navbar.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishlists: []
    }
  }

  componentDidMount() {
    // fetchData = () => {
      axios.get('/api/wishlists') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data)// The entire response from the Rails API
        console.log(response.data.message.length) // Just the message
        this.setState({
          wishlists: this.state.wishlists.concat(response.data.message)
        });
      }) 
    // }
  }

  render() {
    return (
      <div className="App">
        <h1>My wishlists</h1>
        {this.state.wishlists.map(wishlist => (
          <Wishlist key={wishlist.id} wishlist={wishlist}/>
        ))}
      </div>
    );
  }
}

export default App;