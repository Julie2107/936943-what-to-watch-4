import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const DEFAULT_VALUE = 3;
const ReviewValue = {
  MIN_VALUE: 50,
  MAX_VALUE: 400,
};

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
      const {id, onFormSubmit} = this.props;

      evt.preventDefault();

      onFormSubmit(id, {
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
      if (ReviewValue.MIN_VALUE < target || target > ReviewValue.MAX_VALUE) {
        return false;
      }
      return true;
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
    id: PropTypes.number.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  return WithAddReviewForm;
};

export default withAddReview;
