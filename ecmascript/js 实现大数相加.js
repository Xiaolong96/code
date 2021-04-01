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


/* 大数相乘
---------------------------------------------------------------- */



let multiply = function (num1, num2) {
  //判断输入是不是数字
  if (isNaN(num1) || isNaN(num2)) return "";
  let len1 = num1.length,
    len2 = num2.length;
  let ans = [];

  //这里倒过来遍历很妙,不需要处理进位了
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      let index1 = i + j,
        index2 = i + j + 1;
      let mul = num1[i] * num2[j] + (ans[index2] || 0);
      ans[index1] = Math.floor(mul / 10) + (ans[index1] || 0);
      ans[index2] = mul % 10;
    }
  }

  //去掉前置0
  let result = ans.join("").replace(/^0+/, "");

  //不要转成数字判断，否则可能会超精度！
  return !result ? "0" : result;
};

console.info('🎈 %c[大数相乘]\n', 'color: #1890ff;', multiply('4503599627370496', '4503599627370496'));
