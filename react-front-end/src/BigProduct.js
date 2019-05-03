import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import ProductForm from './ProductForm.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
// import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class BigProduct extends Component {
  constructor(props){
    super(props)
    this.state ={
      product:[],
      currentProductId: null,
    }
  }

  componentDidMount(){
    axios.get(`/api/products/${this.props.match.params.id}`)
    .then((res) => {
      console.log(res.data)
      this.setState({
        product: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })

  }

  deleteProduct = (e) => {
    e.preventDefault()
    axios.delete(`/api/products/${e.target.id}`)
    .then(<Redirect to="/"></Redirect>)
  }

  toggleForm = (e) => {
    e.preventDefault()
    this.setState({currentProductId:e.target.id})
    return <ProductForm product = {this.state.product}/>
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        {this.state.currentProductId && <ProductForm product = {this.state.product}/>}
      {!this.state.currentProductId && <Card className={classes.card} key={this.state.product.name}>
      <Link to={`/wishlists/${this.state.product.wishlist_id}`}>Back</Link>
      <CardHeader title={this.state.product.name} />
      <img className="bigproduct-img" src={this.state.product.img_url} alt={this.state.product.name} />
      <CardContent>
              <Typography component="p">
                <p>Price: {this.state.product.price}</p>
              </Typography>
              <Typography component="p">
                <p>Rating: {this.state.product.rating}</p>
              </Typography>
              <Typography component="p">
                <p>Notes: {this.state.product.note}</p>
              </Typography>
              <Typography component="p">
                <p>Date Added: {this.state.product.created_at}</p>
              </Typography>
              <Typography component="p">
              <a href={this.state.product.url}>Buy now</a>
              </Typography>
              <IconButton id={this.state.product.id} onClick={this.deleteProduct}>
              <DeleteIcon />
              </IconButton>
              <IconButton id={this.state.product.id} onClick={this.toggleForm}>
              <i class="material-icons">border_color</i>
              </IconButton>              
            </CardContent>  
      </Card>
      }
      </div>
    );
  }
}

export default withStyles(styles)(BigProduct)