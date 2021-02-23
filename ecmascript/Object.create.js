/**
 * 模拟 Object.create
 * @param {Object} o 基准对象
 */
function create(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function Test() {}

Test.prototype.log = () => {
  console.log("test");
};

const obj = create(Test.prototype);

obj.log();
