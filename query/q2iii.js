db.movies_metadata.aggregate([
  {
    $addFields: {
      budgetNumber: {
        $cond: {
          if: { $in: ['$budget', ['', null, false]] },
          then: 'unknown',
          else: {
            $cond: {
              if: { $isNumber: '$budget' },
              then: '$budget',
              else: {
                $cond: {
                  if: { $regexMatch: { input: '$budget', regex: /USD/ } },
                  then: {
                    $toInt: {
                      $trim: {
                        input: '$budget',
                        chars: ' USD',
                      },
                    },
                  },
                  else: {
                    $toInt: {
                      $trim: {
                        input: '$budget',
                        chars: '/$',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $addFields: {
      rounded: {
        $cond: {
          if: { $isNumber: '$budgetNumber' },
          then: { $round: ['$budgetNumber', -6] },
          else: '$budgetNumber',
        },
      },
    },
  },
  {
    $group: {
      _id: '$rounded',
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      budget: '$_id',
      count: 1,
    },
  },
  {
    $sort: { count: -1 },
  },
]);
