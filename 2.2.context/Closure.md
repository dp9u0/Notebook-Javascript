# 闭包

当了解完执行上下文(VO Scope)等相关概念后,闭包就简单很多了.

## Why

由于函数调用时,参数和局部变量是在栈上维护的,调用时入栈,调用结束出栈,参数和局部变量就不在栈上存在了.

然而,Javascript中会存在函数代码中使用了参数和局部变量以外的变量的情况(自由变量):

* 问题一

```javascript

function Foo(){
    var init = 0;
    return Bar(){
        return ++init;
    }
}
Foo()();
```

在调用Bar()时,Foo()已经调用结束,并且init也不再栈上存在了.这时候如何获取init就成为了一个问题.

* 问题二

```javascript
var init =0 ;

function Bar(){
    return ++init;
}

function Foo(func){
    var init = 0;
    func();
}

Bar();
Foo(Bar);
```

上述代码中,Bar调用时,init 分别取值是什么?

## What

闭包就是为了解决上述概念而设计的: 函数创建时,通过将上层上下文数据保存下来(__保存的是引用__,即作用域链),可以通过逐层遍历查找访问自由变量.

理论上,当函数创建时,将上下文数据保存下来就算是闭包,但实践中,只有当在函数代码中引用了自由变量,并且创建该函数的上下文已经销毁才算是闭包.

首先上下文数据保存时,保存的是引用,而不是数据拷贝,因此VO变化后,会影响到其他闭包,同一个上下文创建的闭包之间也会相互影响:

```javascript
var first,second;
function Foo(){
    var x = 1;
    first = function(){ console.log(++x);}
    second = function(){ console.log(++++x);}
    x  =100;
}
first();
second();
```

```javascript
var data = []
for(var i = 0;i<3;i++){
    data[i] = function(){
        console.log(i);
    }
}

data[0]();
data[1]();
data[2]();
```