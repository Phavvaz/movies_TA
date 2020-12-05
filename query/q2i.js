// Task 2i

db.movies_metadata.aggregate([
  {
    $match: { vote_count: { $gte: 1838 } },
  },
  {
    $project: {
      _id: 0,
      title: '$title',
      vote_count: '$vote_count',
      score: {
        $let: {
          vars: {
            x: {
              $multiply: [
                {
                  $divide: [
                    '$vote_count',
                    { $add: ['$vote_count', { $toInt: 1838 }] },
                  ],
                },
                '$vote_average',
              ],
            },
            y: {
              $multiply: [
                {
                  $divide: [
                    { $toInt: 1838 },
                    { $add: ['$vote_count', { $toInt: 1838 }] },
                  ],
                },
                { $toInt: 7 },
              ],
            },
          },
          in: { $round: [{ $add: ['$$x', '$$y'] }, 2] },
        },
      },
    },
  },
  {
    $sort: { score: -1, vote_count: -1, title: 1 },
  },
  {
    $limit: 20,
  },
]);
