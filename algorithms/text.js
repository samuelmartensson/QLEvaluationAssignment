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
