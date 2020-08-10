import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {DEFAULT_VALUE, ReviewValue} from "../consts.js";

const withAddReview = (Component) => {
  class WithAddReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: DEFAULT_VALUE,
        comment: ``,
        isValid: false,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    _handleFormSubmit(evt) {
      const {movie, onFormSubmit} = this.props;

      evt.preventDefault();

      onFormSubmit(movie.id, {
        rating: this.state.rating,
        comment: this.state.comment,
      });
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value
      });
    }

    _handleCommentChange(evt) {
      this.setState({
        comment: evt.target.value,
        isValid: this._validateForm(evt.target.value)
      });
    }

    _validateForm(target) {
      const validValue = (target.length > ReviewValue.MIN_VALUE && target.length < ReviewValue.MAX_VALUE) ? true : false;
      return validValue;
    }

    render() {
      return (<Component
        {...this.props}
        onFormSubmit={this._handleFormSubmit}
        onRatingChange={this._handleRatingChange}
        onCommentChange={this._handleCommentChange}
        isValid={this.state.isValid}
      />);
    }
  }

  WithAddReviewForm.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  return WithAddReviewForm;
};

export default withAddReview;
