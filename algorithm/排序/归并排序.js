function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let ret = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      ret.push(left.shift());
    } else {
      ret.push(right.shift());
    }
  }

  return ret.concat(left.length ? left : right);
}

/* test
---------------------------------------------------------------- */
let arr = [5, 3, 8, 3, 11];
let res = mergeSort(arr);
console.log(res);
