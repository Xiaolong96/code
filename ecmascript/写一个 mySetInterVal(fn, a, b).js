// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterVal(fn, a, b) {
  this.count = 0;
  this.timer = null;
  this.start = () => {
    this.timer = setTimeout(() => {
      fn();
      this.count++;
      this.start();
    }, a + this.count * b);
  };

  this.stop = () => {
    clearTimeout(this.timer);
    this.count = 0;
  };
}

var a = new mySetInterVal(
  () => {
    console.log("123");
  },
  1000,
  2000
);
a.start();
a.stop();
