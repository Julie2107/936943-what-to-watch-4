import {TITLES, POSTER} from "../consts.js";
import {getRandomInteger} from "../utils.js";

const MOVIES_COUNT = 8;


const generateMovie = () => {

  return {
    title: TITLES[getRandomInteger(TITLES.length)],
    poster: POSTER
  };
};

const generateMovies = (count) => new Array(count)
    .fill(``)
    .map(generateMovie);


export const smallMovies = generateMovies(MOVIES_COUNT);
