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

const movieAdapter = (movie) => ({
  id: movie.id,
  title: movie.name,
  backgroundColor: movie.background_color,
  backgroundImage: movie.background_image,
  description: movie.description,
  director: movie.director,
  genre: movie.genre,
  isFavourite: movie.isFavourite,
  poster: movie.poster_image,
  cover: movie.preview_image,
  srcPreview: movie.preview_video_link,
  rating: movie.rating,
  releaseYear: movie.released,
  ratingNumber: movie.scores_count,
  ratingValue: getRatingValue(movie.rating),
  runTime: movie.run_time,
  starring: movie.starring,
  src: movie.video_link,
});

export default movieAdapter;
