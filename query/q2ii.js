// Task 2ii

// q2ii
db.movies_metadata.aggregate([
  {
    $addFields: {
      splittedTagline: {
        $split: ['$tagline', ' '],
      },
    },
  },
  {
    $unwind: '$splittedTagline',
  },
  {
    $addFields: { trim1: { $trim: { input: '$splittedTagline', chars: '.' } } },
  },
  {
    $addFields: { trim2: { $trim: { input: '$trim1', chars: '!' } } },
  },
  {
    $addFields: { trim3: { $trim: { input: '$trim2', chars: '?' } } },
  },
  {
    $addFields: { trim4: { $trim: { input: '$trim3', chars: ',' } } },
  },
  {
    $addFields: {
      splittedTaglineLen: { $strLenCP: '$trim4' },
      splittedTaglineToLower: { $toLower: '$trim4' },
    },
  },
  {
    $match: { splittedTaglineLen: { $gt: 3 } },
  },
  {
    $group: {
      _id: '$splittedTaglineToLower',
      count: { $sum: 1 },
    },
  },
  {
    $project: { count: 1 },
  },
  {
    $sort: { count: -1 },
  },
  { $limit: 20 },
]);
