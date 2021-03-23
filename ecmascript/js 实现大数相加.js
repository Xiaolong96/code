let a = "9007199254740991";
let b = "1234567899999999999";

function add(a, b) {
  let maxLength = Math.max(a.length, b.length);
  // 用0去补齐长度
  a = a.padStart(maxLength, "0");
  b = b.padStart(maxLength, "0");
  // 定义加法过程中需要用到的变量
  let sum = "";
  let total = 0;
  let carry = 0; // "进位"
  for (let i = maxLength - 1; i >= 0; i--) {
    total = parseInt(a[i]) + parseInt(b[i]) + carry;
    sum = (total % 10) + sum;
    carry = Math.floor(total / 10);
  }
  if (carry) {
    sum = carry + sum;
  }
  return sum;
}

console.log(add(a, b));
