function insertionSort(arr) {
  let len = arr.length;

  for (let i = 1; i < len; i++) {
    let preIndex = i - 1;
    let current = arr[i];
    while (preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

/* test
---------------------------------------------------------------- */
let arr = [5, 3, 8, 3, 11];
let res = insertionSort(arr);
console.log(res);
