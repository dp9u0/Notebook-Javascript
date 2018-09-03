function Foo() {}
let foo = new Foo();
console.log(Foo.prototype);
console.log(foo.__proto__);
console.log(`foo.__proto__ 等于 Foo.prototype(foo由Foo构造):${foo.__proto__ === Foo.prototype}`);
console.log(`foo.__proto__ instance of Foo : ${foo.__proto__ instanceof Foo}`); // 原型并不是通过构造函数构造的一个实例,即不是 new Foo()出来的
console.log(`foo.__proto__ instance of Object : ${foo.__proto__ instanceof Object}`); // 原型是通过 new Object() 构造出来的
console.log(`foo instance of Foo : ${foo instanceof Foo}`); // foo 才是 Foo 的实例