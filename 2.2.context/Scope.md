# Scope

## 作用域

作用域分为全局作用域 函数作用域 (ES6中增加了块作用域 仅针对 let const)

全局作用域即从JS引擎开始到结束都算是全局作用域.

函数作用域简单来说就是一个函数开始到结束的范围:

```javascript
// ++++begin global scope++++
var a = 10,
    b = 20;
// ++++begin Foo scope++++
function Foo() {
    var c = 10,
        d = 20;
    // ++++begin bar scope++++
    function Bar() {
        var e = 10,
            f = 20;
    }
    // ----end bar scope----
}
// ----end Foo scope----
// ----end global scope----
```

* 作用域有上下级关系:Foo的作用域是Bar的父级作用域
* __作用域在函数创建时就确定了__

## 作用域链

### 自由变量

### scope chain