import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import ProductForm from './ProductForm.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
// import SvgIcon from '@material-ui/core/SvgIcon';
import { withTheme } from '@material-ui/core/styles';


const styles = theme => ({
  card: {
    maxWidth: 600,
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
});

class BigProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      currentProductId: null,
    }
  }

  componentDidMount() {
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
    this.setState({ currentProductId: e.target.id })
    return <ProductForm product={this.state.product} />
    // <Link to={`/wishlists/${this.state.product.wishlist_id}`}><Button variant="contained" color="primary.light">Back to Wishlist</Button></Link>
  }

  render() {
    const { classes } = this.props
    return (
      <div className="bigproduct" color="primary">
        {this.state.currentProductId && <ProductForm product={this.state.product} />}
        {!this.state.currentProductId && <Card color="primary" className={classes.card} key={this.state.product.name}>
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
            <IconButton>
              <Typography component="p">
                <a href={this.state.product.url}>Buy now</a>
              </Typography>
            </IconButton>
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

export default withTheme()(withStyles(styles)(BigProduct))