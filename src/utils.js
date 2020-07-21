export const getRandomInteger = (max, min = 0) => min + Math.floor(Math.random() * (max - min));

export const getFilteredMovies = (movies, genre) => movies.filter((movie) => movie.genre === genre);

export const getGenresList = (movies) => movies.map((movie) => movie.genre);
