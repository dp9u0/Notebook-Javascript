# 运算符

## 结合性

.. OP .. OP ..

### 左结合

``` shell
(.. OP ..) OP ..
```

### 右结合

``` shell
.. OP (.. OP ..)
```

## 20

* 圆括号运算符 (..)

## 19

* (*左结合*)成员访问 .....  : ```obj.pro1.prop2```
* (*左结合*)属性访问器 ..[..]
* new 带参数 new ..(..)

例如 new foo()

* (*左结合*)函数调用 ..(..)

```javascript
function foo() {
    return function bar() {
       console.log('this is a test string');
    }
}
foo()();
```

## 18 (*右结合*)

* new不带参数 new ...

```javascript
function foo() {
    return function bar() {
        this.test = 'this is a test string';
    }
}
var test = new new foo;
console.log(test.test);
```

## 17

* ..++ :
* ..--

## 16 (*右结合*)

* !..
* ~..
* +..
* -..
* ++..
* --..
* typeof
* void
* delete
* await

## 15 (*右结合*)

* 幂 ..**..

## 14 (*左结合*)

* 乘 .. * ..
* 除 .. / ..
* 取模 .. % ..

## 13 (*左结合*)

* 加 .. + ..
* 减 .. - ..

## 12 (*左结合*)

* 左移 .. << ..
* 右移 .. >> ..
* 无符号右移 .. >>> ..

## 11 (*左结合*)

* 小于 .. < ..
* 小于等于 .. <= ..
* 大于 .. > ..
* 大于等于 .. >= ..
* .. in ..
* .. instanceof ..

## 10 (*左结合*)

* 等 .. == ..
* 不等 .. != ..
* 全等 ... === ..
* 非全等 .. !== ...

## 9 (*左结合*)

* 按位与 ..&..

## 8 (*左结合*)

* 按位异或 .. ^ ..

## 7 (*左结合*)

* 按位或 .. | ..

## 6 (*左结合*)

* 与 .. && ..

## 5 (*左结合*)

* 或 .. || ..

## 4 (*左结合*)

* 条件运算符 .. ? .. : ..

## 3 (*右结合*)

* 赋值 =, +=, -=, *=, /=, %=, <<=, >>=, >>>=, &=, ^=, |=

```javascript
var a,b,c,d;
a = b = c = d = 4;
```

## 2 (*右结合*)

* yield
* yield*

## 1

* 展开 ... ..

```javascript
function foo(a, b, c, d) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
}

var arr = [1, null, , 4];
foo(...arr);
```

## 0 (*左结合*)

* 逗号 .. , ..