var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
  let compareFn = (a, b) => {
    let aArr = a.split(".");
    let bArr = b.split(".");
    let maxLen = Math.max(aArr.length, bArr.length);
    for (let i = 0; i < maxLen; i++) {
      aArr[i] = Number(aArr[i] || 0);
      bArr[i] = Number(bArr[i] || 0);
      if (aArr[i] !== bArr[i]) {
        return aArr[i] - bArr[i];
      }
    }
    // return 0;
  };
  return versions.sort(compareFn);
}

console.log(sortVersion(versions));
// => ['1.5','1.45.0','3.3.3.3.3.3','6']
