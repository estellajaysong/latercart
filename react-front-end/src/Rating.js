import React, { Component } from 'react';
import axios from 'axios';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    margin: -10
  },
}



class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.pid,
      rating: this.props.rating
    }
  }

  checkHeart = value => e => {
    this.setState({
      rating: value
    })
    axios({
      method: 'put', 
      url: `/api/products/${this.state.id}`,
      data: {
        rating: value,
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <FormGroup row>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="1" checked={this.state.rating >= 1} onClick={this.checkHeart(1)} classes={{root: classes.root}}/>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="2" checked={this.state.rating >= 2} onClick={this.checkHeart(2)} classes={{root: classes.root}}/>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="3" checked={this.state.rating >= 3} onClick={this.checkHeart(3)} classes={{root: classes.root}}/>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="4" checked={this.state.rating >= 4} onClick={this.checkHeart(4)} classes={{root: classes.root}}/>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="5" checked={this.state.rating > 4} onClick={this.checkHeart(5)} classes={{root: classes.root}}/>
      </FormGroup>
    )
  }
}

export default withStyles(styles)(Rating)