import React from "react";
import PropTypes from "prop-types";
import {Header} from "../header/header.jsx";
import {getSendingReviewStatus} from "../../reducer/data/selectors.js";
import {connect} from "react-redux";
import {AppRoute} from "../../consts.js";
import {Link} from "react-router-dom";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {ReviewValue} from "../../hocs/with-add-review.js";

const AddReview = ({movie, onFormSubmit, onRatingChange, onCommentChange, isSending, isValid, authStatus}) => {
  const isDisabled = isSending || !isValid;

  const headerTitleMarkup =
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.MOVIE}/${movie.id}`}
            className="breadcrumbs__link"
          >
            {movie.title}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header
          title={headerTitleMarkup}
          addClass={``}
          authorizationStatus={authStatus}
        />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.poster} alt={movie.title} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#"
          className="add-review__form"
          onSubmit={onFormSubmit}
        >
          <div className="rating">
            <div className="rating__stars"
              onChange={onRatingChange}
            >
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              onChange={onCommentChange}
              minLength={ReviewValue.MIN}
              maxLength={ReviewValue.MAX}
              className="add-review__textarea"
              name="review-text" id="review-text"
              placeholder="Review text"

            ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit"
                disabled={isDisabled}
              > Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReview.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isSending: getSendingReviewStatus(state),
  authStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(AddReview);
