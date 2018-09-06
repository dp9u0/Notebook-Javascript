# VariableObject

## VO

VO(VariableObject)是指跟执行上下文相关的一个对象,存储了:

* 变量(var 变量声明)
* 函数(函数声明)
* 形参
* ...

可以把VO认为是ExecuteContext的一个属性 :

```javascript
let Context =
{
    VO : {
        var1 : undefined,
        func1 : function(){},
        //...
    }
}
```

## VO的实现

首先 VO 提供的基本功能为 (AbstractVO):

* 通过 __声明变量(函数)__ ```var x``` 向VO中添加属性'x';
* 通过 __变量(函数)名__ 'x' 向VO中存、取值;

这里重点是变量:声明变量,操作变量是通过向VO中添加属性,存取数据进行的.即 ```var x``` __相当于__ ```VO['x'] = undefined```

然而在不同的上下文的VO中还有需要有其他的功能,因此,实际实现中,根据ExecuteContext的不同(全局上下文,函数上下文),不同上下文中的VO实现也有所不同:

* GlobalExecuteContext 的 VO : 在全局上下文中.VO即global,即 VO === this === global(window)
  
  globalContext 的 VO 即 global,在 DOM 中 即window对象:

  ```javascript
  global = {
      Math :{},
      // .....
      window : global
  }
  ```

  除了有AbstractVO的功能,由于VO === global,带来了一些不一样的用法,可以直接通过global或者this向VO中直接添加属性:(这不是VO的功能,而是 global的功能,只是由于 VO === global,才有这种用法)

  ```javascript
  global.x = '';
  // 甚至
  x ='';// 在任意位置调用,相当于 global.x = ''
  ```

  上述代码看似与下面代码类似 :

  ```javascript
  var x = '';
  ```

  但是却有着本质区别的 : 第二种是代码声明变量,JS引擎向VO中添加属性, 第一种是代码直接向 global即VO 中添加 __属性__ ,虽然最终效果一致,但是概念却不相同.

  这也就解释了声明变量的唯一方式是 : ```var x``` ,而不是有些说法一样 还可以通过 ```x =''```,声明全局变量,这是错误的.仅仅向global,即VO添加了一个属性.

  ```javascript
  var a = 'test';
  console.log(window['a']=== a); //浏览器下
  ```

* FunctionExecuteContext 的 VO (AO) : 函数上下文中,VO !==this (this 可以直接访问,因此与Global不同,函数上下文的VO一个无法直接访问的对象).
  
  函数上下文使用了一个无法直接访问的对象称为活动变量对象AO,即 VO === AO (活动变量对象).
  
  函数上下文的VO 除了 __AbstractVO__ 具有的功能,还需要 :
  * arguments 对象
  * 形参

  ```javascript
    function Foo(x, y, z) {
        console.log(Foo.name);

        console.log(Foo.length);
        console.log(arguments.length);

        console.log(arguments.caller);
        console.log(arguments.callee === Foo);

        console.log(arguments[0] === x);
        arguments[0] = 30;
        console.log(x);
        x = 40;
        console.log(arguments[0]);
        //BUG:
        z = 50;
        console.log(arguments[2]);
        arguments[2] = 50;
        console.log(z);
    }
    Foo(10, 20);
  ```

  __综上所述,VO 有两种实现 : 全局上下文的 VO = global 和 函数上下文的 VO = AO.__

## 执行阶段

VO涉及到两个阶段:进入上下文初始化,执行代码修改.

### 进入上下文

进入上下文,会初始化上下文中的VO:(注意先后顺序,并且后面的不会影响前面的)

* 函数形参
* 函数声明: 如果VO包含同名属性,则替换
* 变量声明: 如果VO包含同名属性,则不会影响

```javascript
function Foo(x,y,z){
    var a = 10; // 变量声明 a
    function bar(){} // 函数声明 bar
    var b = function c(){} // 变量声明 b 执行阶段赋值为函数表达式
    (function d(){}); // 函数表达式 不处理
}
Foo(1,2);
// AO 如下
AO = {
    arguments:{
        0:1,
        1:2,
        length:2
    }
    x:1,
    y:2,
    a:undefined,
    bar:bar,
    b:undefined,
}
```

```javascript
function Foo(x, y, z) {
    console.log(x); // => function
    console.log(t); // => function
    var t = 100;
    function x() {}
    function t() {}
}
Foo(10, 20);
```

### 执行代码

执行代码过程中,则开始对VO的属性读取or赋值:

```javascript
// VO 初始化
function Foo(x,y,z){
    // 代码执行
    var a = 10; // 变量声明 a
    function bar(){} // 函数声明 bar
    var b = function c(){} // 变量声明 b 执行阶段赋值为函数表达式
    (function d(){}); // 函数表达式 不处理
}

AO['a'] = 10;
AO['b'] = function(){};
```