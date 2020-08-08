import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const DEFAULT_VALUE = 3;

const withAddReview = (Component) => {
  class WithAddReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: DEFAULT_VALUE,
        comment: ``,
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
        comment: evt.target.value
      });
    }

    render() {
      return (<Component
        {...this.props}
        onFormSubmit={this._handleFormSubmit}
        onRatingChange={this._handleRatingChange}
        onCommentChange={this._handleCommentChange}
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
