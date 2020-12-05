db.ratings.aggregate([
  {
    $group: {
      _id: '$rating',
      count: { $sum: 1 },
    },
  },
  {
    $addFields: { rating: '$_id' },
  },
  {
    $project: { _id: 0, rating: 1, count: 1 },
  },
  {
    $sort: { rating: -1 },
  },
]);
