// Task 3ii

db.credits.aggregate([
  {
    $unwind: '$crew',
  },
  {
    $match: { $and: [{ 'crew.id': 5655 }, { 'crew.job': 'Director' }] },
  },
  {
    $unwind: '$cast',
  },
  { $project: { cast: 1 } },
  {
    $group: {
      _id: { actor_name: '$cast.name', id: '$cast.id' },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      count: 1,
      name: '$_id.actor_name',
      id: '$_id.id',
    },
  },
  {
    $sort: { count: -1, id: 1 },
  },
  {
    $limit: 5,
  },
]);
