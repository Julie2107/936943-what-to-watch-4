import React from "react";
import PropTypes from "prop-types";


const ReviewsTab = ({reviews}) => {
  const createComment = (review, i) => {
    return (
      <div key={i + review.date} className="review">
        <blockquote className="review__quote">
          <p className="review__text">{review.message}</p>

          <footer className="review__details">
            <cite className="review__author">{review.author}</cite>
            <time className="review__date" dateTime="2016-12-24">{review.date}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{review.rating}</div>
      </div>
    );
  };

  const createCommentsList = (comments) => comments.map((comment, i) => {
    return createComment(comment, i);
  });

  const firstCommentColumn = createCommentsList(reviews.slice(0, reviews.length / 2));
  const secondCommentColumn = createCommentsList(reviews.slice(reviews.length / 2, reviews.length));

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
        message: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      }).isRequired
  )
};

export default ReviewsTab;
