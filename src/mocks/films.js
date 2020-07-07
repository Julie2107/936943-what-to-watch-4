import {getRandomInteger} from "../utils.js";

const MOVIES_COUNT = 8;
const TITLES = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`, `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`, `Dogma`];
const GENRES = [`Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];
const COVER = `img/bg-the-grand-budapest-hotel.jpg`;

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

const generateMovie = () => {
  const movieTitle = TITLES[getRandomInteger(TITLES.length)];
  return {
    title: movieTitle,
    poster: getPosterSrc(movieTitle),
    genre: GENRES[getRandomInteger(GENRES.length)],
    cover: COVER,
    releaseYear: getRandomInteger(2020, 2000),
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  };
};

const generateMovies = (count) => new Array(count)
    .fill(``)
    .map(generateMovie);


export const smallMovies = generateMovies(MOVIES_COUNT);
