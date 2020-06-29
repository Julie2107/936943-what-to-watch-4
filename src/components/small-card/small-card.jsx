import React from "react";
import PropTypes from "prop-types";

const MovieSmallCard = ({movie, onMouseHover}) => {
  const {poster, title} = movie;
  return (
    <article className="small-movie-card catalog__movies-card"
     // onMosuseHover = {onMouseHover}
    >
      <div className="small-movie-card__image">
        <img src={poster} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieSmallCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
 // onMouseHover: PropTypes.func.isRequired,
};

export default MovieSmallCard;

