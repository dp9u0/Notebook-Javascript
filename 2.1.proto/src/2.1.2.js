function Foo() {}
let foo1 = new Foo();
let foo2 = new Foo();
console.log(`
foo1的构造函数为 : ${foo1.constructor},
foo1和foo2的构造函数相等 : ${foo1.constructor === foo2.constructor},
这是因为foo1,foo2的构造函数都是 Foo : ${foo1.constructor === Foo && foo2.constructor === Foo},
即foo1 instance of Foo : ${foo1 instanceof Foo},
即foo2 instance of Foo : ${foo2 instanceof Foo},
`);

let ob = {};

console.log(`实例都有对应的构造函数:
ob : ${ob.constructor}
Foo : ${Foo.constructor}
Object : ${Object.constructor},
Foo Object既是类型(构造函数)又是函数实例,因此它们的构造函数相同,都是 Function : ${Foo.constructor === Object.constructor && Object.constructor === Function}
`);