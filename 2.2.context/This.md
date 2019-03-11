# this

this 是 执行上下文上的一个属性:

```javascript
Context = {
    VO : {},
    this : thisValue
}
```

this也是在进入上下文阶段初始化好的,并且函数执行过程中无法改变.```this = xxx ;``` 会报错.

```js
global.a = 'ooops, global';

function foo() {
  console.log(this.a);
}
```

## 默认绑定

全局环境中,this默认绑定到window/global

```js
// 默认绑定
console.log('默认绑定');
foo(); //true
```

## 隐式绑定

被直接对象所包含的函数调用时,也称为方法调用,this隐式绑定到该直接对象

```js
// 隐式绑定
console.log('隐式绑定');
var obj1 = {
  a: 'ooops, obj1',
  foo: foo,
  obj2: {
    a: 'ooops, obj2',
    foo: foo
  }
}
//foo()函数的直接对象是obj1,this隐式绑定到obj1
obj1.foo(); //1
//foo()函数的直接对象是obj2,this隐式绑定到obj2
obj1.obj2.foo(); //2
```

但是如果将对象方法赋值给一个变量再次调用,会出现隐式绑定丢失的情况

```js
// 隐式绑定丢失:函数别名
var obj3 = {
  a: 'ooops, obj3',
  foo: foo
}
//把obj.foo赋予别名bar,造成了隐式丢失,因为只是把foo()函数赋给了bar,而bar与obj对象则毫无关系
console.log('隐式绑定丢失:函数别名');
var bar = obj3.foo;
bar(); //0

// 隐式绑定丢失:参数传递
console.log('隐式绑定丢失:参数传递');

function bar(fn) {
  fn();
}
var obj4 = {
  a: 'ooops, obj4',
  foo: foo
}
//把obj.foo当作参数传递给bar函数时,有隐式的函数赋值fn=obj.foo。与上例类似,只是把foo函数赋给了fn,而fn与obj对象则毫无关系
bar(obj4.foo); //0
```

## 显示绑定

### call apply bind

可以通过 Function.prototype 上定义的 `.apply .call .bind` 指定 this 值.

```js
// 显式绑定
console.log('显式绑定');
var obj5 = {
  a: 'ooops, obj5',
};
foo();
foo.call(obj5);
```

### API context

javascript中新增了许多内置函数,具有显式绑定的功能,如数组的5个迭代方法：`map(),forEach(),filter(),some(),every()`

```js
// API 函数绑定
console.log('API 函数绑定');
var obj6 = {
  a: 'ooops, obj6',
};
[1, 2, 3].forEach(foo); //1 "ooops, global" 2 "ooops, global" 3 "ooops, global"
[1, 2, 3].forEach(foo, obj6); //1 "fn" 2 "fn" 3 "fn"
```

## new绑定

```javascript
console.log('new绑定');
let newObj = new foo();
```

这时候,new 操作会调用Foo内部的 [[Construct]],创建对象foo后,调用[[Call]],可以简单理解为

```javascript
let newObj = {};
newObj.__proto__= foo.prototype;
foo.call(newObj);
```

## 优先级

### 显示绑定和隐式绑定优先级

```js
function foo() {
  console.log( this.a );
}
var obj1 = {
  a: 2,
  foo: foo
};
var obj2 = {
  a: 3,
  foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

### new绑定和显示绑定优先级

```js
function foo(something) {
  this.a = something;
}

var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError( "Function.prototype.bind - what " +
        "is trying to be bound is not callable"
      );
    }
    var aArgs = Array.prototype.slice.call( arguments, 1 ),
      fToBind = this,
      fNOP = function(){},
      fBound = function(){
        return fToBind.apply(
          (
            this instanceof fNOP &&
            oThis ? this : oThis
          ),
          aArgs.concat( Array.prototype.slice.call( arguments ) )
        );
      }
    ;

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

### 优先级总结

1. new绑定.`var bar = new foo()`
2. 显示绑定.`var bar = foo.call( obj2 )`
3. 隐式绑定
4. 默认绑定

## 特殊情况

### 显示绑定忽略this

如果显示绑定this 传递的是 null,使用默认绑定

```js
function foo() {
  console.log( this.a );
}
global.a = 2;
foo.call( null ); // 2
```

这是有些情况下确实不需要this,但是调用 call apply bind时又必须的传递,因此建议使用建议安全的DMZ对象作为默认this

```js
function foo(a,b) {
  console.log( "a:" + a + ", b:" + b );
}
// our DMZ empty object
var ø = Object.create( null );
// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

### 表达式

```js
function foo() {
  console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2 // 赋值表达式 返回值本身
```

### 严格模式

独立调用的函数的this指向undefined

### Soft Bind

```js
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this,
      curried = [].slice.call( arguments, 1 ),
      bound = function bound() {
        return fn.apply(
          (!this ||
            (typeof window !== "undefined" &&
              this === window) ||
            (typeof global !== "undefined" &&
              this === global)
          ) ? obj : this,
          curried.concat.apply( curried, arguments )
        );
      };
    bound.prototype = Object.create( fn.prototype );
    return bound;
  };
}
function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding
```

### 箭头函数

ES6 新增的 箭头函数: this继承自Scope

```js
function foo() {
  // return an arrow function
  return (a) => {
    // `this` here is lexically adopted from `foo()`
    console.log( this.a );
  };
}

var obj1 = {
  a: 2
};

var obj2 = {
  a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
```