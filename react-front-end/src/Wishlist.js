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
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,    
    height: 230
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 2
  },
});


class Wishlist extends Component {
  constructor(props){
    super(props)
    this.state ={
      products:[],
      showShareForm: false,
      showDelete: true,
      currentWishlistId: this.props.wishlist.id,
      showTitle: true,
      showEdit: false
    }
    
  }
  componentDidMount(){
    axios({
      method: 'get', 
      url: `/api/wishlists/${this.props.wishlist.id}`,
      params: {
        request: "the last 4"
      },
    })
    .then((res) => {
      this.setState({
        products: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // showEditForm = () => {
  //   this.setState({
  //     showEdit: true,
  //     showTitle: false
  //   })
  // }

  editWishlistName = () => {
    this.setState({
      showEdit: true,
      showTitle: false
    })
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
        {this.state.showTitle ?
          <h1 className='title' onClick={this.editWishlistName}> {this.props.wishlist.name ? this.props.wishlist.name : "My Wishlist"}</h1> 
          : null
        } 
        {this.state.showEdit ? 
          <input className='titleInput' type="text" name="name" placeholder={this.props.wishlist.name} onBlur={this.props.onChange} /> 
          : null
        }    
        <div className={this.props.classes.root} m={6}>
        <Grid container spacing={16} >
          {this.state.products.slice(0, 2).map(product => (
            <Grid item sm={6} key={product.id}>
            <Paper className={this.props.classes.paper}>
              <Product product={product} key={product.id} />
            </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={16} >
          {this.state.products.slice(2).map(product => (
            <Grid item sm={6} key={product.id}>
            <Paper className={this.props.classes.paper}>
              <Product product={product} key={product.id}/>
            </Paper>
            </Grid>
          ))}
        </Grid>
        </div>
        <footer>
          <span className="shareButton" onClick={this.openShare}>
            Share
          </span>

          <Link to={`/wishlists/${this.props.wishlist.id}`}><h1>Go to: </h1> </Link>

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

Wishlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wishlist);
