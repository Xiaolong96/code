/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (typeof x !== "number") {
    return;
  }
  const MIN = -(2 ** 31);
  const MAX = 2 ** 31;

  let tmp = Math.abs(x);
  tmp = String(tmp).split("").reverse().join("");

  tmp = x > 0 ? parseInt(tmp, 10) : 0 - parseInt(tmp, 10);

  if (tmp >= MIN && tmp <= MAX) {
    return tmp;
  }
  return 0;
};

// console.log(reverse(-14352));
