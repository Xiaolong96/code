// https://leetcode-cn.com/problems/maximum-subarray/

/**
 * dp[i]：表示以 nums[i] 结尾的连续子数组的最大和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 因为只需要知道dp的前一项，我们用int代替一维数组
  let dp = nums[0];
  let max = dp;
  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(dp + nums[i], nums[i]);
    max = Math.max(max, dp);
  }
  return max;
};
