/**
 * 冒泡排序：相邻比较，简单粗暴
 * @param {Array} arr
 */
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // 每次遍历交换都会把最大的移动到最后排好序，如果没交换，说明排序结束了
    let swapped = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

/* test
---------------------------------------------------------------- */
let arr = [5, 3, 8, 3, 11];
let res = bubbleSort(arr);
console.log(res);
