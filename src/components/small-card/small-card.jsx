import React from "react";
import PropTypes from "prop-types";

const MovieSmallCard = ({movie, onMouseCardHover, onMouseCardHoverOff, onTitleClick}) => {
  const {poster, title} = movie;
  const handleMouseHover = () => onMouseCardHover(movie);
  const handleTitleClick = (evt) => {
    evt.preventDefault();
    onTitleClick(movie);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={handleMouseHover}
      onMouseLeave={onMouseCardHoverOff}
    >
      <div className="small-movie-card__image" onClick={handleTitleClick}>
        <img src={poster} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title" onClick={handleTitleClick}>
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
  onMouseCardHover: PropTypes.func.isRequired,
  onMouseCardHoverOff: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MovieSmallCard;

