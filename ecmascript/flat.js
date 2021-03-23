Array.prototype.flat = function (depth = 1) {
  let newArr = [...this];
  while (depth--) {
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] instanceof Array) {
        newArr.splice(i, 1, ...newArr[i]);
      }
    }
  }
  return newArr;
};

// 改进版本
Array.prototype.flatten = function (depth = 1) {
  return this.reduce((acc, item) => {
    // ! 关键 [].concat(1,[2]) ==> [1, 2]
    return acc.concat(
      Array.isArray(item) && depth > 1 ? item.flatten(depth - 1) : item
    );
  }, []);
};

const arr1 = [0, 1, 2, [3, 4], 5];
const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr1.flatten());
console.log(arr2.flatten());
