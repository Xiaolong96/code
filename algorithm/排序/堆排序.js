var len; // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

// 建立大顶堆
function buildMaxHeap(arr) {
  len = arr.length;
  // 最后一个非叶子结点下标 Math.floor(len / 2)
  for (var i = Math.floor(len / 2); i >= 0; i--) {
    adjustHeap(arr, i);
  }
}

function adjustHeap(arr, i) {
  // 堆调整
  var left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    // 交换可能会导致 largest 的堆结构变化需要继续调整
    adjustHeap(arr, largest);
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapSort(arr) {
  buildMaxHeap(arr);

  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    // 不需要调整后面已经排序好的了
    len--;
    adjustHeap(arr, 0);
  }
  return arr;
}

/* test
---------------------------------------------------------------- */
let arr = [5, 3, 8, 3, 11];
let res = heapSort(arr);
console.log(res);
