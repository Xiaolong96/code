(function jsonp() {
  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");
  script.src = "http://domain:port/testJSONP?a=1&b=2&callback=fn";
  head.appendChild(head);
})();

function fn(data) {
  console.log("通过jsonp获取后台数据:", data);
}

// 后台代码
// 因为是通过 script 标签调用的 后台返回的相当于一个 js 文件
// 根据前端传入的 callback 的函数名直接调用该函数
// 返回的是 'foo(3)'
function testJSONP(callback, a, b) {
  return `${callback}(${a + b})`;
}
