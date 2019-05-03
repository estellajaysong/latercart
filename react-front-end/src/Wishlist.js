import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product.js';
import { Link } from "react-router-dom";
import ShareForm from './ShareForm.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

export default class Wishlist extends Component {
  constructor(props){
    super(props)
    this.state ={
      products:[],
      showShareForm: false,
      showDelete: true,
    }
  }
  componentDidMount(){
    axios.get(`/api/products/${this.props.wishlist.id}`)
    .then((res) => {
      this.setState({
        products: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

  editWishlistName = () => {
    this.props.onEdit(this.props.wishlist.id)
  }

  deleteWishlist = () => {
    this.props.onDelete(this.props.wishlist.id)
  }

  openShare = () => {
    this.setState({
      showShareForm: true,
      showDelete: false
    })
  }
  handleClose = () => {
    this.setState({ 
      showShareForm: false,
      showDelete: true 
    });
  };

  render() {
    return (
      <div className="wishlist" >
          <Link to={`/wishlists/${this.props.wishlist.id}`}><h1>Go to: </h1> </Link>
          <h1 onClick={this.editWishlistName}> {this.props.wishlist.name}</h1>
          {/* <Grid container spacing={2}> */}
          {this.state.products.map(product => (
            // <Grid item xs={1}>
            <Product product={product} key = {product.id}/>
            // </Grid>
          ))}
          {/* </Grid> */}
          <footer>
            <span className="shareButton" onClick={this.openShare}>
              Share
            </span>
            {this.state.showDelete ? 
              <span className="deleteButton" onClick={this.deleteWishlist}>
                X
              </span> 
              : null}
            <Dialog
              open={this.state.showShareForm}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              className="sharePopup"
            >
              <DialogTitle id="form-dialog-title">Share "{this.props.wishlist.name}" with Friends</DialogTitle>
              <DialogContent>
                <ShareForm wishlist={this.props.wishlist}/> 
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </footer>
      </div>
    );
  }
}

