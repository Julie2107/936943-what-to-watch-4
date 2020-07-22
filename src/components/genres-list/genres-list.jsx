import React from "react";
import PropTypes from "prop-types";


const GenresList = ({genresList, onFilterChange, currentGenre}) => {

  const renderGenreItem = (genre, i) => {
    const genreKey = genre + i;
    const genreItemClass = genre === currentGenre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`;
    return (
      <li key={genreKey} className={genreItemClass}>
        <a href="#" className="catalog__genres-link"
          onClick={
            (evt) => {
              evt.preventDefault();
              onFilterChange(genre);
            }
          }

        >{genre}</a>
      </li>
    );
  };

  const renderGenres = (genres) => genres.map((genre, i) => {
    return renderGenreItem(genre, i);
  });

  return (
    <ul className="catalog__genres-list">
      {renderGenres(genresList)}
    </ul>
  );

};

GenresList.propTypes = {
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
};

export default GenresList;
