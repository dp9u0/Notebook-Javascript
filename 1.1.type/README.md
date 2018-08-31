# 基础类型

Javascript 是一门弱类型语言,变量的声明不需要制定类型.

声明变量可以通过关键字 let var 或者 const,然后通过变量名对变量进行求值和赋值,同时,变量也有自己的作用域

## 变量

### 声明

变量(or 常量)声明可以通过以下几种方式

* var 声明一个变量, 例如 var x = 45
* let 声明一个 __块作用域__ 变量,例如 let x = 45,let 和 var 的区别主要是[作用域](#变量作用域)和[提升](#变量声明提升)
* const 声明一个 __块作用域__  __只读__ 常量 例如 const X = 45,const 常量必须在声明时候就赋值
* 非严格模式(strict)下,可以直接赋值,这时候会声明一个全局变量,例如 x=45,永远不要这么做...

### 变量作用域

ES6 之前,变量作用域只有全局变量和局部变量(函数内声明的变量)之分.例如代码块中的变量是不会有特殊对待的.

ES6定义了[语句块](../1.3.控制结构/README.md#block),并且定义了let,使变量的作用域扩展到语句块,而不是单纯的只有局部和全局之分.

使用 __var__ 声明的变量依旧按照旧的行为,只区分方法,而 __let__ 声明的变量不能在语句块外使用.

### 变量声明提升

var 允许变量先使用 后声明.相当于Javascript 将会把后面声明的变量 __提升__ 到函数最前面.

let const 声明的变量不允许变量声明提升.

[var作用域和变量声明提升](./src/1.1.1.js)

```javascript
var a;
console.log(a); // => undefined

// var 作用域
{
  var b = 'test';
}
console.log(b); // => 'test'

// variable hoisting
console.log(c);// => undefined
var c;
```

[let作用域和变量声明提升](./src/1.1.2.js)

```javascript
let a;
console.log(a); // => undefined

// let 作用域
{
  let b = 'test';
}
console.log(b); // => Uncaught ReferenceError : b is not defined

// variable hoisting
console.log(c); // => Uncaught ReferenceError : c is not defined
let c;

```

### 全局变量

全局变量是全局对象的实行.浏览器运行环境中,全局对象是 window.

### 常量

* const 用来声明常量
* 常量无法修改
* 块级作用域
* 不能声明提升

## 类型

Javascript支持的值的类型有:

* __六种基本类型(primitive data type)__ 非对象、无方法、无法改变
  * [Boolean(布尔)](./src/1.1.3.js): true false
  * [Number(数字)](./src/1.1.4.js) : 双精度64位浮点数
  * [String(字符串)](./src/1.1.5.js):
  * [Symbol(符号)(ES6)](./src/1.1.6.js) : ES6 新增
  * [Null(空)](./src/1.1.7.js) : 空值
  * [Undefined(未定义)](./src/1.1.8.js) : 未赋值或未定义
  
* __对象__ 其中内置对象类型有:
  * [Object(对象)](./src/1.1.9.js)
  * Function(函数)
  * [Array(数组)](./src/1.1.10.js)
  * Date(日期)
  * [RegExp(正则表达式)](./src/1.1.11.js)
  * ... ...

除了上述类型,还可以自定义(*对象*)类型,

## 字面量

```javascript
// 数组字面量
var coffees = ["French Roast", "Colombian", "Kona"];
var a=[3];
console.log(a.length); // 1
console.log(a[0]); // 3

var myList = ['home', , 'school', , ];

// 整数字面量
// 0, 117 ,-345 //(十进制, 基数为10)
// 015, 0001 and -0o77 //(八进制, 基数为8)
// 0x1123, 0x00111 and -0xF1A7 //(十六进制, 基数为16或"hex")
// 0b11, 0b0011 and -0b11 //(二进制, 基数为2)

//浮点数字面量
//[(+|-)][digits][.digits][(E|e)[(+|-)]digits]
// 3.14
// -.2345789 // -0.23456789
// -3.12e+12  // -3.12*1012
// .1e-23    // 0.1*10-23=10-24=1e-24

//对象字面量
var car = { manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda" };
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda

// 增强对象字面量 ES6
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    ['prop_' + (() => 42)()]: 42
};

// 正则表达式字面量

var re = /ab+c/;

// 字符串字面量

// 模版字符串
var name = "Bob", time = "today";
var question = `Hello ${name}, how are you ${time}?`;

```