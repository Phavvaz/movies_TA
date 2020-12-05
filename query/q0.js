// Task 0 (Building your first query)

db.ratings.aggregate([
    // TODO: Write your query here
    // Match documents with certain timestamps
    {$match: {timestamp: { $gte:  838857600, $lt: 849398400}}},
    // Perform an aggregation
    {
        $group: {
            _id: "$movieId", // Group by the field movieId
            min_rating: {$min: "$rating"}, // Get the max rating for each group
            max_rating: {$max: "$rating"}, // Get the min rating for each group
            count: {$sum: 1} // Get the count for each group
        }
     },
     // Sort in descending order of count, break ties by ascending order of _id
     {$sort: {"count": -1, "_id": 1}},
     // Limit to only the first 10 documents
     {$limit: 10},
     // Perform a "lookup" on a different collection
     {
         $lookup: {
             from: "movies_metadata", // Search inside movies_metadata
             localField: "_id", // match our _id
             foreignField: "movieId", // with the "movieId" in movies_metadata
             as: "movies" // Put matching rows into the field "movies"
         }
     },
     {
        $project: {
                _id: 0, // explicitly project out this field
                title: {$first: "$movies.title"}, // grab the title of first movie
                num_ratings: "$count", // rename count to num_ratings
                max_rating: 1,
                min_rating: 1
        }
     }
]);

//-- Note that the closest equivalent to $lookup is a LEFT OUTER JOIN, not an
//-- INNER JOIN!
//SELECT 
  //  MAX(rating) as max_rating,
    //MIN(rating) as min_rating,
    //m.title as title,
    //COUNT(*) as num_ratings
// FROM ratings as r LEFT OUTER JOIN movies_metadata as m ON r.movieId = m.id
// WHERE timestamp >= 838857600 AND timestamp < 849398400
// GROUP BY r.movieId
// ORDER BY num_ratings DESC, r._id ASC
// LIMIT 10;