#### Proxy 和 Object.defineProperty 的对比

<details>
<summary>无法监听数组，删除或者增加对象属性无法监听</summary>

Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，且删除或者增加对象属性无法监听到
Object.defineProperty 不能监听数组。是通过重写数据的那 7 个可以改变数据的方法来对数组进行监听的。

Proxy 可以直接监听整个对象而非属性。
Proxy 可以直接监听数组的变化。
Proxy 有 13 中拦截方法，如 ownKeys、deleteProperty、has 等是 Object.defineProperty 不具备的。
Proxy 返回的是一个新对象，我们可以只操作新的对象达到目的，而 Object.defineProperty 只能遍历对象属性直接修改;

</details>

#### 垃圾回收机制与常见内存泄漏

<details>
<summary>引用计数、标记清除</summary>

**引用计数**：这是最初级的垃圾收集算法。此算法把“对象是否不再需要”简化定义为“**对象有没有其他对象引用到它**”。如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。
限制：循环引用

```js
function f() {
  var o = {};
  var o2 = {};
  o.a = o2; // o 引用 o2
  o2.a = o; // o2 引用 o

  return "azerty";
}

f();
```

**标记清除**：这个算法把“对象是否不再需要”简化定义为“**对象是否可以获得**”，即`可达性`

1. 有一组基本的固有可达值，由于显而易见的原因无法删除。这些值称为`根`，例如:

本地函数的局部变量和参数
当前嵌套调用链上的其他函数的变量和参数
全局变量
还有一些其他的，内部的

**可获得不仅是直接的引用关系，如果引用或引用链可以从根访问任何其他值，则认为该值是可获得的。**

标记清除采用的收集策略为：

- JavaScript 中的垃圾收集器运行时会给存储在内存中的所有变量都加上标记；
- 然后去掉环境中的变量以及被环境中的变量引用的变量的标记；
- 此后，再被加上标记的变量被视为准备删除的变量；
- 最后，垃圾收集器完成内存清除，销毁那些带标记的值并回收其占用的内存空间。

> 从 2012 年起，所有现代浏览器都使用了标记-清除垃圾回收算法。

[内存管理-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

##### 常见内存泄露

> `内存泄漏（Memory leak）`是指由于设计错误，程序未能释放已经不再使用的内存，从而造成了内存的浪费。

以下是可能会**导致内存泄漏**的事件：

- 缺少`取消订阅`，这会将组件保留在内存中
- 缺少 `DOM 事件侦听器的注销`：例如滚动事件的侦听器，表单 onChange 事件的侦听器等。
- 未使用时`未关闭的 WebSocket 连接`
- `分离的 DOM 节点`：如果某个节点已从 DOM 树移除，但某些 JavaScript 仍然引用它，我们称此节点为“已分离”
- `意外的全局变量`-定义全局变量时，它们会卡在内存中，直到刷新应用程序为止。使用“严格使用”可以轻松解决此问题
- `被遗忘的计时器或回调`
- `闭包`

可以通过 Dev Tools-> Memory 检查是否内存泄露：
每条**蓝竖线**是一些 JS 对象的内存分配，**灰色竖线**表示对象已在时间线期间分配，但曾对其进行过垃圾回收。可以使用鼠标选择一行以查看有关它的更多详细信息。

</details>

#### 对闭包的看法，为什么要用闭包？说一下闭包原理以及应用场景

<details>
<summary>一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）</summary>

1）什么是闭包
一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

2）闭包原理
函数执行分成两个阶段(预编译阶段和执行阶段)。

在预编译阶段，如果发现内部函数使用了外部函数的变量，则会在内存中创建一个“闭包”对象并保存对应变量值，如果已存在“闭包”，则只需要增加对应属性值即可。
执行完后，函数执行上下文会被销毁，函数对“闭包”对象的引用也会被销毁，但其内部函数还持用该“闭包”的引用，所以其活动对象不会被销毁，直到内部函数被烧毁后才被销毁。

3）优点或者场景
访问到的变量长期驻扎在内存中，可供之后使用
避免变量污染全局
把变量存到独立的作用域，作为私有成员存在

4）缺点
内存泄漏
可能获取到意外的值(captured value)

</details>

#### 类数组和数组的区别，类数组如何转换成数组

<details>
<summary>类数组是一个拥有 length 属性，并且他属性为非负整数的普通对象，类数组不能直接调用数组方法。</summary>

类数组是一个拥有 length 属性，并且他属性为非负整数的普通对象，类数组不能直接调用数组方法。

转换方法

- Array.from()
- Array.prototype.slice.call()
- 进行属性遍历并组成新的数组

转换须知
转换后的数组长度由 length 属性决定。索引不连续时转换结果是连续的，会自动补位。

</details>

#### 大数计算如何实现

<details>
<summary>BigInt、bignumber.js</summary>

- 使用 `BigInt` 属性类型，IE 不支持，88.7% 的覆盖率
  BigInt 是一种内置对象，它提供了一种方法来表示大于 2<sup>53</sup> - 1 的整数，这原本是 Javascript 中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。
  ```js
  let a = BigInt(Number.MAX_SAFE_INTEGER);
  let b = BigInt("9007199254740991");
  a * b; // 81129638414606663681390495662081n
  1n + 2; // 报错
  1n < 2; // true
  ```
- 引用 `bignumber.js` 等第三方库，原理也是把所有数字当做字符串，重新实现了计算逻辑，缺点是性能比原生差很多
</details>

#### 箭头函数和普通函数的区别

<details>
<summary>更简短的函数并且不绑定 this</summary>

> 引入箭头函数有两个方面的作用：**更简短的函数并且不绑定 this**

在箭头函数出现之前，每个新定义的函数都有它自己的 this 值（在构造函数的情况下是一个新对象，在严格模式的函数调用中为 undefined，如果该函数被作为“对象方法”调用则为基础对象等）

```js
function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式, growUp()函数定义 `this`作为全局对象,
    // 与在 Person()构造函数中定义的 `this`并不相同.
    this.age++;
  }, 1000);
}

var p = new Person();
```

1. 箭头函数表达式的语法比函数表达式更简洁。
2. 没有自己的 this，arguments，super 或 new.target
3. 不能用作构造函数，不能使用 bind
4. **箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承 this，即当前执行上下文中的 this**

```js
class Demo {
  // Method
  create() {
    console.log(this);
    const cat = {
      say: function () {
        console.log(this);
      },
      say1: () => {
        console.log(this);
      },
    };
    return cat;
  }
}
const demo = new Demo();
const cat = demo.create();
cat.say();
cat.say1();
// {say: ƒ say(), say1: ƒ say1()}
// Demo {constructor: Object}
```

</details>

#### 同名的变量声明和函数声明提升，谁覆盖谁？

<details>
<summary>同名情况下，函数声明提升优先级要高于变量声明提升，且提升后该函数声明定义不会被提升后的同名变量声明所覆盖，但是会被后续顺序执行的同名变量赋值所覆盖</summary>

> JavaScript 的运行阶段分为`预编译阶段`和`执行阶段`

```JS
var say = function(){
  console.log('1');
};

function say(){
  console.log('2');
};

say(); // 输出：'1'
```

解析：预编译阶段进行变量声明提升和函数声明提升后，上述代码执行效果等同于：

```JS
var say; // 变量声明提升

function say(){ // 函数声明提升
  console.log('2');
}

say = function(){ // 变量赋值保持原位执行，say函数被覆盖
  console.log('1');
};

say(); //输出'1'
```

总结：

- 函数声明提升，会将函数的声明和定义全都提升至作用域顶部。
- 变量声明提升，只提升声明部分（未赋值状态），赋值部分保持原位置不动。

再看一个例子：

```JS
console.log(say); //输出：[Function: say]

function say(){
  console.log('1');
};

var say = '2';

console.log(say); //输出'2'
```

解析：本例中声明的函数和变量同名都是 say，且函数声明在先，变量声明在后，按理说第一次打印 say 值预期会是 undefined，然而结果是[Function: say]。

预编译阶段进行变量声明提升和函数声明提升后，上述代码执行效果等同于：

```JS
var say = function (){ //函数声明（包括定义）提升
  console.log('1');
};

var say; //只是声明，并不会覆盖say的值

console.log(say); //故输出：[Function: say]

say = '2'; //此时say会被覆盖

console.log(say); //输出'2'
```

总结：
**同名情况下，函数声明提升优先级要高于变量声明提升，且提升后该函数声明定义不会被提升后的同名变量声明所覆盖，但是会被后续顺序执行的同名变量赋值所覆盖。**

</details>

#### 模块循环依赖

<details>
<summary>深度优先，模块只会执行一遍，循环依赖取中间缓存，动态引用</summary>

```js
// a.mjs
import { bar } from "./b.mjs";
console.log("bar in A:", bar);
export var foo = "foo";

// b.mjs
import { foo } from "./a.mjs"; // 循环加载 a，a 不会再次被执行，能获取已经导出的部分
console.log("foo in B:", foo);
export var bar = "bar";

setTimeout(() => {
  console.log("异步输出foo in B:", foo); // foo 是动态引用，此时已经可以访问 foo 了
});

/**
 * foo in B: undefined
 * bar in A: bar
 * 异步输出foo in B: foo
 * /
```

CommonJS 的输出结果，异步也访问不到 foo，因为 A 模块只执行一遍，然后将结果缓存。
在 B 执行的时候， A 的 foo 还没有输出，缓存只是一个中间缓存，`const { foo } = require("./a.js");`
foo 被赋值为 undefined，且 foo 并不是引用，后续只要不再次被赋值，就一直是 undefined

```
foo in B: undefined
bar in A: bar
(node:20900) Warning: Accessing non-existent property 'foo' of module exports inside circular dependency
异步输出foo in B: undefined
```

总结:

- 加载器会执行深度优先的依赖加载
- ES6 模块与 CommonJS 模块都不会再去执行重复加载的模块
- 一旦某个模块被循环加载，就只输出已经执行（缓存）的部分，没有执行的部分不输出
- 但由于 ES6 模块是编译时加载，动态引用，所以只需要保证真正取值时能够取到值，即已经声明初始化，代码就能正常执行

</details>

#### var、let、const

<details>
<summary>暂存死区、块级作用域、全局挂载、同名变量</summary>

- var 声明的变量存在变量提升，let 和 const 不会，所以会导致暂存死区（即使上级作用域有同名变量也不会去寻找）
- let 和 const 声明会形成块级作用域
- var 声明的变量会挂载到 window 上，而 let 和 const 不会
- 同一作用域下，let 和 const 不能声明同名变量

</details>

#### 事件循环 macrotask 与 microtask

<details>
<summary>执行栈 -> process.nextTick -> Promise -> setImmediate -> setTimeout</summary>

JS 中分为两种任务类型：`macrotask` 和 `microtask`，在 ECMAScript 中，microtask 称为 `jobs`，macrotask 可称为 `task`

- macrotask（又称之为宏任务），可以理解是**每次执行栈执行的代码就是一个宏任务**（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）

  - 每一个 task 会从头到尾将这个任务执行完毕，不会执行其它
  - 浏览器为了能够使得 JS 内部 task 与 DOM 任务能够有序的执行，会在一个 task 执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->...）

- microtask（又称为微任务），可以理解是在**当前 task 执行结束后立即执行的任务**，也就是说，在当前 task 任务后，下一个 task 之前，在渲染之前，所以它的响应速度相比 setTimeout（setTimeout 是 task）会更快，因为无需等渲染，也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）

macrotask：主代码块、setImmediate、MessageChannel、setTimeout、setInterval 等（可以看到，事件队列中的每一个事件都是一个 macrotask）
microtask：process.nextTick、Promise、MutationObserver 等

> 在 node 环境下，process.nextTick 的优先级高于 Promise
> setImmediate 优先级高于 setTimeout，延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行。（node 实测 0 毫秒的 setTimeout 先于 setImmediate 执行）

所以，总结下运行机制：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
- 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

</details>

#### JSBridge 的双向通信原理

<details>
<summary>JS 调用 Native 的实现方式较多，主要有拦截 URL Scheme 、重写 prompt 、注入 API 等方法</summary>

##### JS 调用 Native

JS 调用 Native 的实现方式较多，主要有拦截 URL Scheme 、重写 prompt 、注入 API 等方法

- 拦截 `URL Scheme`: 这种方法的优点是不存在漏洞问题、使用灵活，可以实现 H5 和 Native 页面的无缝切换。例如在某一页面需要快速上线的情况下，先开发出 H5 页面。某一链接填写的是 H5 链接，在对应的 Native 页面开发完成前先跳转至 H5 页面，待 Native 页面开发完后再进行拦截，跳转至 Native 页面，此时 H5 的链接无需进行修改。但是使用 iframe.src 来发送 URL Scheme 需要对 URL 的长度作控制，使用复杂，速度较慢。
- 重写 prompt 等原生 JS 方法: 主要是拦截 alert、confirm、prompt、console.log 四个方法，分别被 Webview 的 onJsAlert、onJsConfirm、onConsoleMessage、onJsPrompt 监听。另外，如果能与 Native 确定好方法名、传参等调用的协议规范，这样其它格式的 prompt 等方法是不会被识别的，能起到隔离的作用
- 注入 API: 基于 Webview 提供的能力，我们可以向 Window 上注入对象或方法。JS 通过这个对象或方法进行调用时，执行对应的逻辑操作，可以直接调用 Native 的方法

##### Native 调用 JS

Native 调用 JS 比较简单，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可。

##### JSBridge 的使用

如何引用

- 由 H5 引用: 在我司移动端初期版本时采用的是该方式，采用本地引入 npm 包的方式进行调用。这种方式可以确定 JSBridge 是存在的，可直接调用 Native 方法。但是如果后期 Bridge 的实现方式改变，双方需要做更多的兼容，维护成本高
- 由 Native 注入: 这是当前我司移动端选用的方式。在考虑到后期业务需要的情况下，进行了重新设计，选用 Native 注入的方式来引用 JSBridge。这样有利于保持 API 与 Native 的一致性，但是缺点是在 Native 注入的方法和时机都受限，JS 调用 Native 之前需要先判断 JSBridge 是否注入成功

</details>
