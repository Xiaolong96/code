/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const len = s.length;
  for (let i = 0; i < len / 2; i++) {
    if (s[i] !== s[len - 1 - i]) {
      return false;
    }
  }
  return true;
};
