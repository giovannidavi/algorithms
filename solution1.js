// You are given a string S consisting of letters 'a' and 'b'. You want to split it into three separate non-empty parts. The lengths of the parts can differ from one another.

// In how many ways can you split S into three parts, such that each part contains the same number of letters 'a'?

const triangularNumber = n => (n * (n + 1)) / 2;
const solution = (input) => {
  const aCount = (input.match(/a/g) || []).length;
  if (aCount % 3 !== 0) {
    // Cannot be split evenly among 3 parts:
    return 0;
  }
  if (aCount === 0) {
    // triangolar number gives the number of possible splits
    return Math.max(triangularNumber(input.length - 2), 0);
  }
  // Remove the leading characters so that only the middle segment is left:
  let middleSection = input;
  for (let i = 0; i < aCount / 3; i++) {
    middleSection = middleSection.slice(middleSection.indexOf('a') + 1);
  }
  // Do the same for the trailing characters:
  // aCount is the amount of a for single segment
  for (let i = 0; i < aCount / 3; i++) {
    middleSection = middleSection.slice(0, middleSection.lastIndexOf('a'));
  }
  // Now identify the number of characters leading up to the first `a`
  // and the number of characters from the last `a` to the end:
  const leftSize = middleSection.indexOf('a');  // everything before the first a can vary the splits
  const rightSize = middleSection.length - middleSection.lastIndexOf('a') - 1; // everything after the last, same
  return (leftSize + 1) * (rightSize + 1);
};

console.log(solution('babaa')); // 2
console.log(solution('ababa')); // 4
console.log(solution('aba')); // 0
console.log(solution('bbbbb')); // 6
console.log(solution('abaabaaabaaa')); // 4
console.log(solution('abaabbaaabaaa')); // 6