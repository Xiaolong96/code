/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const len = nums.length;
  if (len < 2) {
    return false;
  }

  let sum = 0,
    maxNum = 0;

  for (let num of nums) {
    sum += num;
    maxNum = maxNum > num ? maxNum : num;
  }

  // 奇数直接 false
  if (sum & 1) {
    return false;
  }

  const target = Math.floor(sum / 2);

  if (maxNum > target) {
    return false;
  }

  let dp = new Array(len).fill(0).map(() => new Array(target + 1).fill(false));

  for (let i = 0; i < len; i++) {
    dp[i][0] = true;
  }

  dp[0][nums[0]] = true;
  for (let i = 1; i < len; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[len - 1][target];
};
console.log(canPartition([1, 3, 4]));
