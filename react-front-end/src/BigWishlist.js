import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

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

class BigWishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      expanded: false
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

  render() {
    const {classes} = this.props
    return (
      <div className="bigwishlist">
        <Link to="/">Back</Link>
        {this.state.product.map(prod => (
          <Card className={classes.card} key={prod.name}>
            <CardHeader title={<Link to={`/products/${prod.id}`}>{prod.name}</Link>} />
            <img className="product-img" src={prod.img_url} alt={prod.name} />
            <CardContent>
              <Typography component="p">
                <p>Price: {prod.price}</p>
              </Typography>
            </CardContent>
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
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(BigWishlist)