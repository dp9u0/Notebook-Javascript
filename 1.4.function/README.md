# function

* 函数声明

```javascript
function square(number) {
  return number * number;
}
```

* 函数表达式

```javascript
let squarem = function(number) {
  return number * number;
}
```

* Arguments 对象

arguments 对象是所有（非箭头）函数中都可用的局部变量。

```javascript
function add() {
    var sum =0,
        len = arguments.length;
    for(var i=0; i<len; i++){
        sum += arguments[i];
    }
    return sum;
}
add()                           // 0
add(1)                          // 1
add(1,2,3,4);                   // 10
```

Arguments对象在严格模式和非严格模式下表现会有所不同:[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

* 默认参数值
* 箭头函数
* 方法的定义

```javascript
var obj = {
  foo: function() {
    /* code */
  },
  bar: function() {
    /* code */
  }
};
```

* 剩余参数

```javascript
function(a, b, ...theArgs) {
  // ...
}


function f(...[a, b, c]) {
  return a + b + c;
}

f(1)          // NaN (b and c are undefined)
f(1, 2, 3)    // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)

// 可以在剩余参数上使用任意的数组方法，而arguments对象不可以：

function sortRestArgs(...theArgs) {
  var sortedArgs = theArgs.sort();
  return sortedArgs;
}

alert(sortRestArgs(5,3,7,1)); // 弹出 1,3,5,7

function sortArguments() {
  var sortedArgs = arguments.sort();
  return sortedArgs; // 不会执行到这里
}

alert(sortArguments(5,3,7,1)); // 抛出TypeError异常:arguments.sort is not a function
```

* 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
* arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
* arguments对象还有一些附加的属性 （如callee属性）。

* getter

```javascript
var obj = {
  log: ['example','test'],
  get latest() {
    if (this.log.length == 0) return undefined;
    return this.log[this.log.length - 1];
  }
}
console.log(obj.latest); // "test".

//delete getter
delete obj.latest;

// 使用计算属性名
var expr = 'foo';
var obj = {
  get [expr]() { return 'bar'; }
};
console.log(obj.foo); // "bar"

```

* setter

```javascript
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']
```

* async await

```javascript
var resolveAfter2Seconds = function() {
  console.log("starting slow promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(20);
      console.log("slow promise is done");
    }, 2000);
  });
};

var resolveAfter1Second = function() {
  console.log("starting fast promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(10);
      console.log("fast promise is done");
    }, 1000);
  });
};

var sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');

  // 如果 await 操作符后的表达式不是一个 Promise 对象, 则它会被转换成一个 resolved 状态的 Promise 对象
  const slow = await resolveAfter2Seconds();

  const fast = await resolveAfter1Second();
  console.log(slow);
  console.log(fast);
}

var concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // 立即启动计时器
  const fast = resolveAfter1Second();

  console.log(await slow);
  console.log(await fast); // 等待 slow 完成, fast 也已经完成。
}

var stillSerial = function() {
  console.log('==CONCURRENT START with Promise.all==');
  Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(([slow, fast]) => {
    console.log(slow);
    console.log(fast);
  });
}

var parallel = function() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>console.log(message)); // in this case could be simply written as console.log(resolveAfter2Seconds());
  resolveAfter1Second().then((message)=>console.log(message));
}

sequentialStart(); // sequentialStart 总共花了 2+1 秒
// 等到 sequentialStart() 完成
setTimeout(concurrentStart, 4000); // concurrentStart 总共花了 2 秒
// 等到 setTimeout(concurrentStart, 4000) 完成
setTimeout(stillSerial, 7000); // stillSerial 总共花了 2 秒
// 等到 setTimeout(stillSerial, 7000) 完成
setTimeout(parallel, 10000); // 真正的并行运行
```

* function*

```javascript

function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2 : first = 4 是 next(4) 将参数赋值的
    yield second + 3;             // 5 + 3 : second = 4 是 next(45) 将参数赋值的
}

let iterator = createIterator();

console.log(iterator.next());    // "{ value: 1, done: false }"
console.log(iterator.next(4));   // "{ value: 6, done: false }"
console.log(iterator.next(5));   // "{ value: 8, done: false }"
console.log(iterator.next());    // "{ value: undefined, done: true }"

```

*yield

```javascript
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);// 移交执行权
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```