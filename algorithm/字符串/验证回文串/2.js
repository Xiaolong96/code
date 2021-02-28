/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const s1 = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const s2 = s1.split("").reverse().join("");
  return s1 === s2;
};
