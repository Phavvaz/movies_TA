db.movies_metadata.aggregate([
  {
    $match: {
      $and: [
        { 'genres.name': { $in: ['comedy', 'Comedy'] } },
        { vote_count: { $gte: 50 } },
      ],
    },
  },
  {
    $project: { _id: 0, title: 1, vote_average: 1, vote_count: 1, movieId: 1 },
  },
  {
    $sort: { vote_average: -1, vote_count: -1, movieId: 1 },
  },
  {
    $limit: 50,
  },
]);
