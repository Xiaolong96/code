/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  const hash = {};

  for (let k of s) {
    hash[k] = hash[k] || 0;
    hash[k] += 1;
  }

  for (let k of t) {
    if (!hash[k]) {
      return false;
    }
    hash[k] -= 1;
  }

  return true;
};
