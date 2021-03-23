var list = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 7, name: "部门G", parentId: 2 },
  { id: 8, name: "部门H", parentId: 4 },
];
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  const result = [];
  for (const key in map) {
    const item = map[key];
    if (item.parentId === 0) {
      result.push(item);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
  }
  return result;
}
var result = convert(list);
console.info("🎈 %c[result]\n", "color: #1890ff;", JSON.stringify(result));

// 递归版本
function buildTree(arr, parentId, childrenArray) {
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      item.children = [];
      buildTree(arr, item.id, item.children);
      childrenArray.push(item);
    }
  });
}
function arrayToTree(input, parentId) {
  const array = [];
  buildTree(input, parentId, array);
  return array.length > 0 ? (array.length > 1 ? array : array[0]) : {};
}
const obj = arrayToTree(list, 0);
console.info("🎈 %c[obj]\n", "color: #1890ff;", JSON.stringify(obj));

// 数组转树的其中一种，排序数组转二叉搜索树

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

var sortedArrayToBST = function (nums) {
  if (!nums.length) {
    return null;
  }
  const root = new TreeNode(null);

  if (nums.length > 1) {
    root.left = sortedArrayToBST(nums.splice(0, nums.length / 2));
  }
  root.val = nums[0];
  root.right = sortedArrayToBST(nums.splice(1));
  return root;
};
