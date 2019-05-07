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
    // width: '45%',
    margin: '0.5em',
    minWidth: 350,
    maxWidth: 500,
    minHeight: 450,
    'text-align':'center'
  },
  // expand: {
  //   transform: 'rotate(0deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
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
    let ifBought = (e.target.value === 'true')
    const index = this.state.product.findIndex(x => x.id === id)
    let productsCopy = JSON.parse(JSON.stringify(this.state.product))
    productsCopy[index].bought = !this.state.product[index].bought
    productsCopy[index].bought_by = 'You'
    console.log(productsCopy[index].bought)
    this.setState({
      product: productsCopy,
    })
    axios({
      method: 'put', 
      url: `/api/products/${id}`,
      data: {
        product: {
          bought: ifBought,
          bought_by: ifBought ? this.state.currentUserName : null
        }
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
            <div className="cardBody" style={{minHeight: '400px'}}>
              <CardHeader  title={<Link to={`/products/${prod.id}`} style={{ textDecoration: 'none', color: '#122434' }} color="primary">{prod.name}</Link>} />
              <img className="product-img-big-wish" src={prod.img_url} alt={prod.name} />
              <CardContent>
                <Typography style={{color:"#122434"}} type="dark" variant="body1">
                  <span>Price: {prod.price}</span>
                </Typography>
              </CardContent>
            </div>
            <footer className="bigWFooter" >
              <Rating rating={prod.rating} pid={prod.id}/>
              <FormControlLabel
                label={this.boughtStatus(prod.id) ? ("Bought by " + this.whoBoughtThis(prod.id)) : 'Mark as "Bought"'}
                control={
                  <Checkbox
                    checked={this.boughtStatus(prod.id)}
                    onChange={this.handleCheck(prod.id)}
                    value={this.boughtStatus(prod.id)? "false" : "true"}
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