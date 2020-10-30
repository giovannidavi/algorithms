function distanceFromOrigin(x, y) {
  return Math.sqrt(
    Math.pow((x - 0), 2) + Math.pow((y - 0), 2)
  )
}


function solution(S, X, Y) {
  const tagsOfConsideration = {}; // stores the list of candidate tags based on which the limit for the circle will be set
  const duplicateCheck = {};

  const distancesFromOrigin = S.split('').reduce((acc, tag, index) => {
    const distance = distanceFromOrigin(X[index], Y[index]);

    const tagRecord = { distance, coord: [X[index], Y[index]] };
    if (acc[tag]) {
      if (distance < acc[tag].distance) {
        tagsOfConsideration[tag] = acc[tag]; // the second shortest
        acc[tag] = tagRecord;
      }else{
        tagsOfConsideration[tag] = 
          tagsOfConsideration[tag] && // if a toc already exists
          tagsOfConsideration[tag].distance < distance //and is less then this one
          ? tagsOfConsideration[tag] // keep the shorter
          : tagRecord; //else replace
      }
    } else {
      acc[tag] = tagRecord;
    }
    duplicateCheck[tag] = tagRecord;
    return acc;
  }, {});

  let distanceLimit;
  for (let tag in tagsOfConsideration) {
    if (!distanceLimit) {
      distanceLimit = tagsOfConsideration[tag].distance;
    } else if (tagsOfConsideration[tag].distance < distanceLimit) {
      distanceLimit = tagsOfConsideration[tag].distance;
    }
  }

  if (distanceLimit === undefined) return distancesFromOrigin.length || 0;

  const pointsWithinCircle = Object.values(distancesFromOrigin).filter(record => {
    if (record.distance < distanceLimit) {
      return true;
    } else {
      return false;
    }
  });
  
  return pointsWithinCircle.length || 0;
}

console.log(solution("ABDCAAH", [2, -1, -4, -3, 3, 4, 3.5], [2, -2, 4, 1, -3, 4, 3.5]))
console.log(solution("CCDACC", [1, -2, -1, -1, 3, -1.5], [-1, -1, 1, 1, 3, 1.5]))
console.log(solution("CCD", [1, -1, 2], [1, -1, -2]))
console.log(solution("AFCEBB", [1, 3, -3, 3, -3, 2], [1, 4, -4, -4, 4, 2] ))
console.log(solution("", [1, 3, -3, 3, -3, 2], [1, 4, -4, -4, 4, 2] ))
console.log(solution("AAA", [1, 1, 1], [1, 2, 2] ))