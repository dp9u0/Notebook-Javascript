# this

this 是 执行上下文上的一个属性:

```javascript
Context = {
    VO : {},
    this : thisValue
}
```

this也是在进入上下文阶段初始化好的,并且函数执行过程中无法改变.```this = xxx ;``` 会报错.

## 默认绑定

## 隐式绑定

## 显示绑定

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

### bind

### API context

## new绑定

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

## 优先级

## 特殊情况