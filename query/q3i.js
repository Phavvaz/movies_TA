// Task 3i

db.credits.aggregate([
  {
    $unwind: '$cast',
  },
  {
    $match: {
      'cast.name': 'Stan Lee',
    },
  },
  {
    $lookup: {
      from: 'movies_metadata',
      localField: 'movieId',
      foreignField: 'movieId',
      as: 'string',
    },
  },
  {
    $unwind: '$string',
  },
  {
    $project: {
      _id: 0,
      title: '$string.title',
      release_date: '$string.release_date',
      character: '$cast.character',
    },
  },
  {
    $sort: { release_date: -1 },
  },
]);
