db.movies_metadata.aggregate([
  {
    $addFields: {
      budgetNumber: {
        $cond: {
          if: { $in: ['$budget', ['', null, false, 'undefined']] },
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
          then: { $round: ['$budgetNumber', -7] },
          else: '$budgetNumber',
        },
      },
    },
  },
  {
    $addFields: {
      final: {
        $cond: {
          if: { $isNumber: '$rounded' },
          then: '$rounded',
          else: 'unknown',
        },
      },
    },
  },
  {
    $group: {
      _id: '$final',
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
    $sort: { budget: 1 },
  },
]);
