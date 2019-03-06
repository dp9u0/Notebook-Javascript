# Promise

Promise是为了更合理的管理回调而产生的模式.

```js
const Promise = require("../src/promise");

function log(msg) {
  console.log(msg)
}

function test(resolve, reject) {
  var timeOut = Math.random() * 2;
  log('set timeout to: ' + timeOut + ' seconds.');
  setTimeout(function () {
    if (timeOut < 1) {
      log('call resolve()...');
      resolve('200 OK');
    } else {
      log('call reject()...');
      reject('timeout in ' + timeOut + ' seconds.');
    }
  }, timeOut * 1000);
}

var promise1 = new Promise(test);

promise1.then(function (value) {
  log(`resulved : ${value}`);
}, err => {
  log(`rejected 1: ${err}`);
}).catch(err => {
  log(`rejected 2: ${err}`);
});
```

## Promise.all

需要从两个不同的URL分别获得用户的个人信息和好友列表,这两个任务是可以并行执行的,但是需要等到两个任务都完成后才可以进行处理操作.

这种情况下,可以使用Promise.all():

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
  console.log(results); // 获得一个Array: ['P1', 'P2']
});
```

## Promise.race

有些时候,多个异步任务是为了容错.比如,同时向两个URL读取用户的个人信息,只需要获得先返回的结果即可.

这种情况下用Promise.race()

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
  console.log(result); // 'P1'
});
```