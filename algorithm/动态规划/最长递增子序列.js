// https://leetcode-cn.com/problems/longest-increasing-subsequence/

/**
 * dp[i] = max(dp[j]+1，dp[k]+1，dp[p]+1，.....)
 * 只要满足：
 * nums[i] > nums[j]
 * nums[i] > nums[k]
 * nums[i] > nums[p]
 * ...
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let dp = Array(nums.length).fill(1);
  let ret = dp[0];

  for (let i = 1; i < nums.length; i++) {
    let cur = nums[i];
    for (let j = 0; j < i; j++) {
      if (cur > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    ret = Math.max(ret, dp[i]);
  }
  return ret;
};
