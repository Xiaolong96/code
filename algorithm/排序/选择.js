function selectionSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
}

/* test
---------------------------------------------------------------- */

let arr = [5, 3, 8, 3, 11];
let res = selectionSort(arr);
console.log(res);
