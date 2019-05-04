import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
// import classnames from 'classnames';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  card: {
    width: 400,
    margin: '0.5em',
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
      expanded: false
    }
  }

  // handleExpandClick = (e) => {
  //   console.log(e)
  //   this.setState({ expanded: !this.state.expanded })
  //   // console.log(e.target.id)
  //   // const index = this.state.product.findIndex(x=> x.id === e)
  //   // console.log(index)
  //   // this.setState({product: this.state.product.filter((x,e) => e !== index)})
  //   // this.setState({[e.target.id]: !this.state[e.target.id]})
// react part: 
      // <IconButton color='primary'
      // className= {classnames(classes.expand, {[classes.expandOpen]:this.state.expanded})}
      // onClick={this.handleExpandClick}
      // aria-expanded={this.state.expanded}
      // aria-label="Show more"
      // >
      // <ExpandMoreIcon />
      // </IconButton>
      // <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
      // <CardContent>
      //   <Typography paragraph>
      //     Rating: {prod.rating}
      //   </Typography>
      //   <Typography paragraph>
      //     Notes: {prod.note}
      //   </Typography>
      //   <Typography paragraph>
      //     Date Added: {prod.created_at}
      //   </Typography>
      // </CardContent>
      // </Collapse>
  //
  // }

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
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
      <div className="bigwishlist">        
        {this.state.product.map((prod) => (
          <Card color='primary' className={classes.card} key={prod.id}>
            <CardHeader title={<Link to={`/products/${prod.id}`}>{prod.name}</Link>} />
            <img className="product-img-big-wish" src={prod.img_url} alt={prod.name} />
            <CardContent>
            <h1>{prod.expanded}</h1>
              <Typography variant="body1">
                Price: {prod.price}
              </Typography>
              <Typography>
                Rating: 
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      </React.Fragment>
    );
  }
}

export default withTheme()(withStyles(styles)(BigWishlist))