import React from "react";
import PropTypes from "prop-types";


const GenresList = ({genresList}) => {

  const renderGenreItem = (genre, i) => {
    const genreKey = genre + i;

    return (
      <li key={genreKey} className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">{genre}</a>
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
};

export default GenresList;
