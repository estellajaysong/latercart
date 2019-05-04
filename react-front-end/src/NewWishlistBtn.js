import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  card: {
    maxWidth: 350,
    margin: 20,
    boxShadow: 5
  }
})


function NewWishlistBtn(props) {
  return(
    <Card className={props.classes.card} onClick={props.addWishlist}>
      <button className="newWishBtn">
        + <br/> <div className="newWishBtnFont">New Wishlist</div>
      </button> 
    </Card>
  )

}

NewWishlistBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewWishlistBtn);