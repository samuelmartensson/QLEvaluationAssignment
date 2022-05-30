const removeConsecutiveIdenticalInstances = (string, instanceLength = 4) => {
  let result = [];

  for (let i = 0; i < instanceLength - 1; i++) {
    result.push(string[i]);
  }

  for (let i = instanceLength - 1; i < string.length; i++) {
    const regex = new RegExp("[a-z]");

    if (!regex.test(string.charAt(i))) {
      result.push(string[i]);
      continue;
    }

    const shouldAdd = [...Array(instanceLength).keys()]
      .map((n) => string.charAt(i) !== string.charAt(i - n))
      .filter(Boolean);

    if (shouldAdd.length > 0) {
      result.push(string[i]);
    }
  }

  return result.join("");
};
const testStr = "teeeeeewstxx5555321xxxxoooo232111111";
const removedConsecutive = removeConsecutiveIdenticalInstances(testStr);
console.log({ removedConsecutive });

const digitSum = (n) => {
  let sum = 0;
  while (n) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
};

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

const LENGTH = 150;
const VALUE_RANGE = 1500000;

const testArr = [...Array(Math.floor(Math.random() * LENGTH)).fill(1)].map(
  (item) => item * Math.floor(Math.random() * VALUE_RANGE)
);

const largestOddSum = getLargestSum(testArr);
console.log({ largestOddSum });
