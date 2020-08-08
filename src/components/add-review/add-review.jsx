import React from "react";
import PropTypes from "prop-types";
import {Header} from "../header/header.jsx";
import {getMovies} from "../../reducer/data/selectors.js";
import {connect} from "react-redux";

const AddReview = ({id, movies, onFormSubmit, onRatingChange, onCommentChange}) => {
  const movie = movies.find((movieItem) => movieItem.id === id);

  const headerTitleMarkup =
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="movie-page.html" className="breadcrumbs__link">{movie.title}</a>
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
              className="add-review__textarea"
              name="review-text" id="review-text"
              placeholder="Review text"

            ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit"> Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReview.propTypes = {
  movies: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

export default connect(mapStateToProps)(AddReview);
