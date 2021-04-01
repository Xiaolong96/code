// 实现输出一个十六进制的随机颜色(#af0128a)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getColor() {
  let result = new Array(6);
  let i = 0;
  let hexMap = ["a", "b", "c", "d", "e", "f"];
  while (i < 6) {
    let data = getRandomInt(0, 16);

    result[i] = data >= 10 ? hexMap[data % 10] : data;

    i++;
  }
  return `#${result.join("")}`;
}

console.log(getColor());
