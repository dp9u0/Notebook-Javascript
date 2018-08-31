# 模块化

Javascript 设计之初只是作为一个html 的脚本语言,并没有考虑到如今这样的应用,因此不像Java 或者 C# 等语言一样对模块化处理的比较好.

* JavaScript没有模块系统。
* JavaScript没有标准库。
* JavaScript没有包管理系统。

这里简单介绍几种Javascript 的模块化方案:

## CommonJS

CommonJS制定了解决这些问题的一些规范，而Node.js就是这些规范的一种实现。

```javascript
// sum.js
exports.sum = function(){/*do sth.*/};

//calculate.js
var math = require('sum');
exports.add = function(n){
    return math.sum(val,n);
};
```

## AMD

只定义了一个函数 "define": ```define(id?, dependencies?, factory);```

[AMD-(中文版)](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))

## CMD

[CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)

## AMD CMD 异同

* 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.

* CMD 推崇依赖就近，AMD 推崇依赖前置。

* AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一

[AMD CMD 异同](https://lifesinger.wordpress.com/2011/05/17/the-difference-between-seajs-and-requirejs/)