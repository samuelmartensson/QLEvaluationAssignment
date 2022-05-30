const digitSum = (n) => {
  let sum = 0;
  while (n) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
};

// Assume to return a value like -1 when only one or less odd sums exist
const getLargestSum = (arr) => {
  let oddNums = [];

  for (let i = 0; i < arr.length; i++) {
    let temp = digitSum(arr[i]);

    if (!!(temp % 2)) {
      oddNums.push(arr[i]);
    }
  }

  if (oddNums.length <= 1) return -1;

  const sorted = oddNums.sort((a, b) => b - a);

  return sorted[0] + sorted[1];
};

// Driver
const LENGTH = 150;
const VALUE_RANGE = 1500000;

const testArr = [...Array(Math.floor(Math.random() * LENGTH)).fill(1)].map(
  (item) => item * Math.floor(Math.random() * VALUE_RANGE)
);

const largestOddSum = getLargestSum(testArr);
console.log({ largestOddSum });
