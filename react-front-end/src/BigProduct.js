import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import ProductForm from './ProductForm.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


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
        // console.log(res.data)
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
          <CardHeader title={this.state.product.name} color="4"/>
          <img className="bigproduct-img" src={this.state.product.img_url} alt={this.state.product.name} />
          <CardContent>
            <Typography variant="body1">
              Price: {this.state.product.price}
            </Typography>
            <Typography variant="body1">
              Rating: {this.state.product.rating}
            </Typography>
            <Typography variant="body1">
              Notes: {this.state.product.note}
            </Typography>
            <Typography variant="body1">
              Date Added: {this.state.product.created_at}
            </Typography>
            <Button variant="contained" className="buy">
            <Link target="_blank" to={this.state.product.url}>Buy Now</Link>
            </Button>
            <IconButton id={this.state.product.id} onClick={this.deleteProduct}>
              <DeleteIcon />
            </IconButton>
            <IconButton id={this.state.product.id} onClick={this.toggleForm}>
              <i className="material-icons">border_color</i>
            </IconButton>
          </CardContent>
        </Card>
        }
      </div>
    );
  }
}

export default withTheme()(withStyles(styles)(BigProduct))