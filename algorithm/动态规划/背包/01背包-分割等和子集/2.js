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

  let dp = new Array(target + 1).fill(false);

  dp[0] = true; // 前面的边界条件已经把 false 的情况排除了

  for (let num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
};
console.log(canPartition([1, 3, 4]));
