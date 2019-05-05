import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Rating from './Rating.js';
import LoginForm from './LoginForm.js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  card: {
    width: 400,
    heigtht: 500,
    margin: '0.5em',
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

class BigWishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      expanded: false,
      sortBy: 'newest',
      currentUserName: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).name : null,
    }
  }

  componentDidMount() {
    axios.get(`/api/wishlists/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          product: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleSort = e => {
    console.log(e.target.value)
    this.setState({
      sortBy: e.target.value
    })
    axios({
      method: 'get', 
      url: `/api/wishlists/${this.props.match.params.id}`,
      params: {
        request: e.target.value
      },
    })
    .then((res) => {
      console.log(res)
      this.setState({
        product: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  };

  handleCheck = id => e => {
    console.log(id)
    console.log(e.target.value)
    const index = this.state.product.findIndex(x => x.id === id)
    let productsCopy = JSON.parse(JSON.stringify(this.state.product))
    productsCopy[index].bought = !this.state.product[index].bought
    this.setState({
      product: productsCopy,
    })
    axios({
      method: 'put', 
      url: `/api/products/${id}`,
      data: {
        bought: e.target.value,
        bought_by: this.state.currentUserName
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  boughtStatus = id => {
    const index = this.state.product.findIndex(x => x.id === id)
    return this.state.product[index].bought
  }

  whoBoughtThis = id => {
    const index = this.state.product.findIndex(x => x.id === id)
    if (this.state.product[index].bought_by === this.state.currentUserName) {
      return "You"
    } else {
      return this.state.product[index].bought_by
    }
  }

  render() {
    const {classes} = this.props
    return (
      localStorage.getItem("jwt") ? 
      (<React.Fragment>
        <div className="sortByForm">
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <NativeSelect value={this.state.sortBy} name="sort" onChange={this.handleSort}>
              <option value={'newest'}>Newest</option>
              <option value={'rating'}>Rating</option>
            </NativeSelect>
          </FormControl>
        </div>
      <br/><br/><br/>
      <div className="bigwishlist">        
        {this.state.product.map(prod => (
          <div className={this.boughtStatus(prod.id) ? "inactiveCard" : "activeCard"} key={prod.id}>
          <Card color="primary" className={classes.card} key={prod.id}>
            <CardHeader title={<Link to={`/products/${prod.id}`}>{prod.name}</Link>} />
            <img className="product-img" src={prod.img_url} alt={prod.name} />
            <CardContent>
              <Typography component="p">
                <span>Price: {prod.price}</span>
              </Typography>
            </CardContent>
            <footer>
              <Rating rating={prod.rating} pid={prod.id}/>
              <FormControlLabel
                label={this.whoBoughtThis(prod.id) === null ? 'Mark as "Bought"' : ("Bought by " + this.whoBoughtThis(prod.id))}
                control={
                  <Checkbox
                    checked={this.boughtStatus(prod.id)}
                    onChange={this.handleCheck(prod.id)}
                    value={!this.boughtStatus(prod.id)}
                  />
                }
              />
            </footer>
          </Card>
          </div>
        ))}
      </div>
      </React.Fragment>) 
      :
      (<LoginForm />)
    );
    
  }
}

export default withTheme()(withStyles(styles)(BigWishlist))