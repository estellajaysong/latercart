import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Wishlist from './Wishlist.js'

export default class ListDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: "",
      myLists: [] 
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      this.setState({currentUser:response.data.currentUser,
      myLists: response.data.myLists})
    }) 
  }

  //for list in wishlist
  renderFunction (myList){
    let key = 0;
    let lists = this.state.myLists.map(list => {
      key +=1
        return (<div key={key}>
           {list}
          </div>)
    })
      return lists;
  }

  render() {
    return (
      <Router>
      <div className="dropdown">
        <button className = "dropbtn">My Lists</button>
        <div className="dropdown-content">
        <Link to="/wishlist1">{this.renderFunction(this.state.myLists)} </Link>
        </div>
        <Route path="wishlist1" component={Wishlist}/>
      </div>
      </Router>
    );
  }
}


