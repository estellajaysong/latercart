import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
      sortBy: 'newest'
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
        request: "change bought status"
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

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
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
          <div className={this.boughtStatus(prod.id) ? "inactiveCard" : "activeCard"}>
          <Card color="primary" className={classes.card} key={prod.name}>
            <CardHeader title={<Link to={`/products/${prod.id}`}>{prod.name}</Link>} />
            <img className="product-img" src={prod.img_url} alt={prod.name} />
            <CardContent>
              <Typography component="p">
                <p>Price: {prod.price}</p>
              </Typography>
            </CardContent>
            <footer>
              <FormControlLabel
                label="Bought"
                control={
                  <Checkbox
                    checked={this.boughtStatus(prod.id) ? true : false}
                    onChange={this.handleCheck(prod.id)}
                    value={this.boughtStatus(prod.id) ? false : true}
                  />
                }
                
              />
            </footer>
            <IconButton
              className= {classnames(classes.expand, {[classes.expandOpen]:this.state.expanded})}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Rating: {prod.rating}
                </Typography>
                <Typography paragraph>
                  Notes: {prod.note}
                </Typography>
                <Typography paragraph>
                  Date Added: {prod.created_at}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
          </div>
        ))}
      </div>
      </React.Fragment>
    );
    
  }
}

export default withTheme()(withStyles(styles)(BigWishlist))