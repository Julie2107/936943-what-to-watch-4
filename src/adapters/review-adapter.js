const reviewAdapter = (review) => ({
  id: review.id,
  author: review.user.name,
  userId: review.user.id,
  rating: review.rating,
  date: review.date,
  message: review.comment
});

export default reviewAdapter;
