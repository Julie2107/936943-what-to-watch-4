import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ReviewsTab = ({reviews}) => {
  const renderComment = (review) => {
    const reviewKey = review.id;

    return (
      <div key={reviewKey} className="review">
        <blockquote className="review__quote">
          <p className="review__text">{review.message}</p>

          <footer className="review__details">
            <cite className="review__author">{review.author}</cite>
            <time className="review__date" dateTime="2016-12-24">{moment(review.date).format(`LL`)}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{review.rating}</div>
      </div>
    );
  };

  const renderCommentsList = (comments) => comments.map(renderComment);

  const firstCommentColumn = renderCommentsList(reviews.slice(0, reviews.length / 2));
  const secondCommentColumn = renderCommentsList(reviews.slice(reviews.length / 2, reviews.length));

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {firstCommentColumn}
      </div>
      <div className="movie-card__reviews-col">
        {secondCommentColumn}
      </div>
    </div>
  );
};


ReviewsTab.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      }).isRequired
  )
};

export default ReviewsTab;
