function Promise(fn) {
  this.data = undefined;
  this.status = "pending";
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    //! 防止多次调用
    if (this.status === "pending") {
      //! 异步
      setTimeout(() => {
        this.data = value;
        this.status = "resolved";
        this.onResolvedCallbacks.forEach((cb) => cb(value));
      });
    }
  };

  const reject = (value) => {
    if (this.status === "pending") {
      setTimeout(() => {
        this.data = value;
        this.status = "rejected";
        this.onRejectedCallbacks.forEach((cb) => cb(value));
      });
    }
  };

  fn(resolve, reject);
}

Promise.prototype.then = function (onResolved, onRejected) {
  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  //! 注意默认函数需要处理值的穿透
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (error) {
          throw error;
        };

  if (this.status === "resolved") {
    return new Promise((resolve, reject) => {
      try {
        const res = onResolved(this.data);
        if (res instanceof Promise) {
          // 简化忽略了此 promise 状态
          //!重点 resolve 的权力被交给了user promise，目的是递归返回真正的 onResolved 的返回值
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      } catch (error) {
        // onResolved 抛出异常会返回拒绝的期约
        reject(error);
      }
    });
  }

  // 此处与前一个 if 块的逻辑几乎相同，区别在于所调用的是onRejected函数
  if (this.status === "rejected") {
    return new Promise((resolve, reject) => {
      try {
        const res = onRejected(this.data);
        if (res instanceof Promise) {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  if (this.status === "pending") {
    return new Promise((resolve, reject) => {
      this.onResolvedCallbacks.push((value) => {
        try {
          const res = onResolved(value);
          if (res instanceof Promise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });

      this.onRejectedCallbacks.push((value) => {
        try {
          const res = onRejected(value);
          if (res instanceof Promise) {
            res.then(resolve, reject);
          }
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};

Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
};

/* test
---------------------------------------------------------------- */

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log(1);
    resolve("end");
    console.log(2);
  }, 1000);
});

setTimeout(() => {
  p.then(console.log);
}, 2000);

p.then((res) => {
  return res + " abc";
})
  .then()
  .then()
  .then(console.log);

p.then((res) => {
  return new Promise((resolve, reject) => {
    reject("promise reject");
  });
}).catch(console.log);
