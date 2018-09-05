# 执行上下文、this、作用域、闭包

本篇介绍Javascript代码执行的一些概念 : 执行上下文,作用域,作用域链,闭包

首先会介绍代码在执行过程中,从方法调用发起切换上下文.

然后介绍上下文中三个重要的部分: VariableObject,this,和 Scope.

最后解释闭包的形成和原理.

此外 还会扩展介绍:不同的函数类型,对上下文的影响. with 关键字.

由于篇幅较大,分为更小的章节:

* [执行上下文](./ExecuteContext.md)
* [VirableObject](./VariableObject.md)
* [this](./This.md)
* [作用域与作用域链](./Scope.md)
* [闭包](./Closure.md)
* [其他一些](./Extend.md)

本文参考了 [Dmitry Soshnikov](http://dmitrysoshnikov.com/) 的一系列博文,写的非常精彩:

[Chapter 1. Execution Contexts](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)

[Chapter 2. Variable object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)

[Chapter 3. This](http://dmitrysoshnikov.com/ecmascript/chapter-3-this/)

[Chapter 4. Scope chain](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)

[Chapter 5. Functions](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/)

[Chapter 6. Closures](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/)
