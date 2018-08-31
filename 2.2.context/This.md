# this

this 是 执行上下文上的一个属性:

```javascript
Context = {
    VO : {},
    this : thisValue
}
```

this也是在进入上下文阶段初始化好的,并且函数执行过程中无法改变.```this = xxx ;``` 会报错.

## global

全局上下文中 this === global

```javascript
this === global;

globalContext = {
    VO : global,
    this : global
}
```

## function

函数上下文中,情况就会变得有些复杂.

```javascript
var foo = { x: 10 };
var bar = {
    x: 20,
    alert: function() {
        console.log(this === bar);
        console.log(this.x);
    }
}

bar.alert();
foo.alert = bar.alert;
var func = bar.alert;
var x = 30;
foo.alert();
func();
```

### 引用类型

关于如何确定 函数调用时候的this 值,需要引入引用类型这一概念:

```javascript
ref(x) = {
    base,
    propertyName,
}

var foo = 10;
function bar(){}

ref(foo) = {
    base : global,
    propertyName : 'foo'
}

ref(bar) = {
    base  : global,
    propertyName : 'bar'
}
```

因此在下面代码中:

```javascript
function Foo(){
    console.log(this);
}

var bar = {};
bar.Foo = Foo;

Foo(); // this = global

// ref(global.Foo) = {
//     base : global,
//     propertyName : 'Foo'
// }

bar.Foo(); // this =  bar

// ref(global.Foo) = {
//     base : bar,
//     propertyName : 'Foo'
// }

Foo.prototype.constructor();// this = Foo.prototype

// ref(Foo.prototype.constructor) = {
//     base : Foo.prototype,
//     propertyName : 'Foo'
// }

```

### 非引用类型

非引用类型都会转换成 global

```javascript
(function foo(){
    console.log(this);
})();

var foo = {
    bar : function(){console.log(this)}
}

foo.bar();

(foo.bar = foo.bar)();
(false||foo.bar)();
```

### base 为活跃对象

当内部子函数在父函数中调用时,虽然子函数为活跃对象属性,base对象恰好为活跃对象,但是此时this 值为 null.

```javascript
function Foo(){
    function Bar(){

    }
    Bar();
    // ref(Bar) = {
    //     base : AO,
    //     propertyName : 'Bar'
    // }
}
```

可以认为,返回了this的值base即AO,但是由于AO是无法直接访问的,因此变成了null.

### with

with 操作会将with 对象添加到作用域链的最前端,在活跃对象之前,因此引用值的base对象变为with对象.

```javascript
var x = 10;

function bar() {
    console.log(this.x);
}
with({
    bar,
    x: 20,
}) {
    bar();
}
```

### catch

```javascript
try {
    function e() {
        console.log(this);
    }
    throw e;
} catch (e) {
    e();
    // ref(e) = {
    //     base: global,
    //     propertyName: 'e'
    // }
}
```

### new

```javascript
function Foo(){
    alert(this);
    this.x = 10;
}
var foo = new Foo();
```

这时候,new 操作会调用Foo内部的 [[Construct]],创建对象foo后,调用[[Call]],可以简单理解为

```javascript
var foo = {};
foo.__proto__= Foo.prototype;
Foo.call(foo);
```

### call apply

可以通过 Function.prototype 上定义的 .apply 和 .call 指定 this 值.

```javascript
var a = 10;

function Foo(b, c) {
    console.log(this.a);
    console.log(b);
    console.log(c);
}

Foo.call({ a: 20 }, 31, 41);
Foo.apply({ a: 30 }, [32, 42]);
```