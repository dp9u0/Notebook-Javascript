function Foo() { this.foo_name = '' }; // 声明一个函数Foo,Foo既是一种Function(Type),同时也是一个Intance(Instance of Function)
// function Object(){} // Built-In Functions(Types),既是一种Function(Type),同时也是一个Intance(Instance of Function)
// function Function(){} // Built-In Functions(Types),既是一种Function(Type),同时也是一个Intance(Instance of Function)
let foo1 = new Foo(); // 构造函数Foo 创建
let foo2 = new Foo(); // 构造函数Foo 创建

let obj1 = {}; // 字面量方式创建 instance ,等同于 new Object() 即下面这种创建方式
let obj2 = new Object(); // 构造函数Object 创建

// 还有一种 方式创建 instance
let prototype = {};
let _obj1 = Object.create(prototype);
let _obj2 = Object.create(prototype);

console.log(foo1.constructor);

console.log(`
foo1和foo2都是由相同的构造函数Foo创建的(constructor相同):${foo1.constructor === foo2.constructor},
所有由构造函数Foo(Function Type)创建的instance的__proto__都相等: ${foo1.__proto__ === foo2.__proto__},
都等于构造函数Foo的prototype:${foo1.__proto__ === Foo.prototype}
`);