import {TITLES, POSTER} from "../consts.js";
import {getRandomInteger} from "../utils.js";


const generateMovie = () => {

  return {
    title: TITLES[getRandomInteger(TITLES.length)],
    poster: POSTER
  };
};

export const generateMovies = (count) => new Array(count)
    .fill(``)
    .map(generateMovie);
