db.keywords.aggregate([
  {
    $match: {
      keywords: {
        $elemMatch: { name: { $in: ['time travel', 'presidential election'] } },
      },
    },
  },
  {
    $project: { _id: 0, movieId: 1 },
  },
  {
    $sort: { movieId: 1 },
  },
]);
