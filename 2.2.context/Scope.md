# Scope

切换执行上下文时,会创建变量对象(VO),用来存放函数(全局)声明的变量,然而函数如何访问到其他函数声明的变量?可以访问到哪些变量?这就与执行上下文相关的另一个概念:作用域链相关了.

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

作用域链可以简单理解为当前代码可以访问哪些变量对象中的变量.一系列变量对象组成一条链,按照顺序查找变量.例如如下代码:

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

Bar内部可以访问的变量对象为:[AO(Bar),AO(Foo),global],作用域链作为执行上下文的属性可以表示为:

```javascript
let BarContext =
{
    AO: {
    }
    this : {}, // this
    Scope : [BarContext.AO,FooContext.AO,global] // 作用域链
}
```

## 函数生命周期

函数声明周期分为创建和调用两部分.

### 创建(声明)

函数对象上定义一个属性[[Scope]],用来保存函数创建时上层 __变量对象__ 链.

* [[Scope]]是属于函数的,注意与执行上下文上的Scope不同,执行上下文是在函数调用阶段的,Scope也在那时才创建.
* 只创建一次,一直存在,直到函数销毁.

### 调用

当函数调用时,进入上下文,创建活跃对象,确定this,并且根据被调用函数生成执行上下文的Scope.

以下面代码为例:

```javascript
var v1 = 1;
var v2 =2
function Foo(){
    var v2 = 2;
    var v3 = 3;
    function Bar(){
        return v2++;
    }
    return Bar;
}

var foobar = { bar : Foo() }; // 执行Foo 创建 Bar()
var result = foobar.bar(); //2


var foobar2 = { bar : Foo() }; // 再次执行Foo 创建 Bar()
var result2 = foobar2.bar(); // 2

foobar.bar(); //3
foobar.bar();//4
foobar2.bar(); // 3
foobar2.bar(); // 4
```

1. 最开始进入JS引擎,切换到globalContext:

    ```javascript
    globalContext = {
        VO : {
            v1 = undefined,
            v2 = undefined,
            Foo, // Foo[[Scope]] = globalContext.Scope
        }, // global
        this : global,
        Scope : [ globalContext.VO ]
    }
    ```

2. 切换到globalContext声明Foo时,赋值 Foo[[Scope]] : ```Foo[[Scope]] = globalContext.Scope;```.
3. 执行```var foobar = { bar : Foo() }```,调用函数Foo(),切换上下文到 FooContext:

    ```javascript
    FooContext = {
        AO :{
            v2 = undefined,
            v3 = undefined,
            Bar, // Bar[[Scope]] = FooContext.Scope
        },
        this : global,
        Scope : [FooContext.AO,...Foo[[Scope]]],
    }
    ```

4. 声明Bar,赋值```Bar[[Scope]] = FooContext.Scope```.
5. 执行```foobar.bar()```,切换上下文:(foobar.bar[[Scope]] === Bar[[Scope]])

    ```javascript
    foobar.barContext = {
        AO : {},
        this : foobar,
        Scope : [foobar.barContext.AO,...Bar[[Scope]]],
    }
    ```
6. 执行Bar中的代码,当需要变量 v2 时,会沿着 Scope 作用域链查找.因此 会在 FooContext.AO中找到.

7. 当再次执行 Foo(),会切换上下文,创建新的 FooContext.AO ,并且 __新的__ Bar,Scope中存放的 FooContext.AO 也会是新的跟步骤4中的是不同的实例.不会共享.

```javascript
var v1 = 1;

function Foo() {
    var init = 0;

    function Bar() {
        return init++;
    }
    return Bar;
}

var f = Foo();
f();

// f[[Scope]] === Bar.[[Scope]]
// 0: Closure (Foo) {type: "closure", name: "Foo", object: {…}}
// 1: Global {type: "global", name: "", object: Window}
```

### Function 创建的函数的[[Scope]]

通过Function构造函数创建的函数,[[Scope]] 只包含 global.

```javascript
var x = 10;

function Foo(){
    var x  = 20;
    var bar = Function('console.log(x)');
    return bar;
}
Foo()();
```