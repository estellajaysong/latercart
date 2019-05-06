import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import ProductForm from './ProductForm.js';
import Rating from './Rating.js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  card: {
    width:'80%',
    margin: 'auto',
    minWidth: 200,
    'text-align':'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
 
});

class BigProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      currentProductId: null,
      toggle: false
    }
  }

  componentDidMount() {
    axios.get(`/api/products/${this.props.match.params.id}`)
      .then((res) => {
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
    axios.delete(`/api/products/${this.state.product.id}`)
    .then(res => this.props.history.push('/'))
  }

  toggleForm = (e) => {
    e.preventDefault()
    this.setState({ currentProductId: this.state.product.id })
    return <ProductForm product={this.state.product} />
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
            <Typography variant="body1" className="rating-container"> 
                Rating:  
              <div style={{ marginLeft :'40%'}}>
                <Rating rating={this.state.product.rating} pid={this.state.product.id} />
              </div>
            </Typography>
            <Typography variant="body1">
              Notes: {this.state.product.note}
            </Typography>
            <Typography variant="body1">
              Date Added: {this.state.product.created_at}
            </Typography>
            <br/>
            <Button variant="outlined" className="buy">
            <a rel="noopener noreferrer" target="_blank" href={this.state.product.url}>Buy Now</a>
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