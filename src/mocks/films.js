import {getRandomInteger} from "../utils.js";

const MOVIES_COUNT = 115;
const TITLES = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`, `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`, `Dogma`];
const GENRES = [`Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];
const COVER = `img/bg-the-grand-budapest-hotel.jpg`;
const DIRECTORS = [`Wes Anderson`, `Kevin Smith`, `Tim Burton`, `Quentine Tarantino`];
const STARRING = [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`];
const NAMES = [`Kate Muir`, `Matthew Lickona`, `Bill Goodykoontz`, `Amanda Greever`, `Paula Fleri-Soler`];

const getPosterSrc = (title) => {
  let src = ``;
  for (let i = 0; i < title.length; i++) {
    if (title[i] === ` `) {
      src += `-`;
    } else {
      src = src + title[i].toLowerCase();
    }
  }
  return `img/${src}.jpg`;
};

export const Movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseYear: 2014,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
};


const Rating = {
  AWESOME: 10,
  VERY_GOOD: 8,
  GOOD: 5,
  NORMAL: 3,
};

const getRatingValue = (rating) => {
  if (rating === Rating.AWESOME) {
    return `Awesome`;
  }
  if (rating < Rating.AWESOME && rating >= Rating.VERY_GOOD) {
    return `Very good`;
  }
  if (rating < Rating.VERY_GOOD && rating >= Rating.GOOD) {
    return `Good`;
  }
  if (rating < Rating.GOOD && rating >= Rating.NORMAL) {
    return `Normal`;
  }
  return `Bad`;
};

const generateComment = () => ({
  id: Math.random(),
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: getRandomInteger(10),
  author: NAMES[getRandomInteger(NAMES.length)],
  date: `November 18, 2015`,
});

const generateComments = (count) => new Array(count).fill(``).map(generateComment);

const generateMovie = () => {
  const movieTitle = TITLES[getRandomInteger(TITLES.length)];
  const movieRating = getRandomInteger(10);

  return {
    title: movieTitle,
    poster: getPosterSrc(movieTitle),
    genre: GENRES[getRandomInteger(GENRES.length)],
    cover: COVER,
    releaseYear: getRandomInteger(2020, 2000),
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: movieRating,
    ratingNumber: getRandomInteger(500),
    ratingValue: getRatingValue(movieRating),
    starring: STARRING,
    director: DIRECTORS[getRandomInteger(DIRECTORS.length)],
    reviews: generateComments(6)
  };
};

const generateMovies = (count) => new Array(count)
    .fill(``)
    .map(generateMovie);

export const smallMovies = generateMovies(MOVIES_COUNT);
