function Foo(ag = 10) {
    this.age = ag;
}
Foo.prototype.name = 'foo.prototype';
Foo.prototype.alert = function() { console.log(`from ${this.name} : age is ${this.age}`); }
let f1 = new Foo(11);
f1.name = 'f1';
let f2 = new Foo(13);
f1.alert();
f2.alert();
// f1.alert2(); // f1.alert2 is not a function
// f2.alert2(); // f2.alert2 is not a function
Foo.prototype = { name: 'foo.prototype2', alert: function() { console.log(`来自 ${this.name} : 年龄是 ${this.age}`); } };
Object.prototype.alert2 = function() { console.log(`来自 Object.prototype :  ${this.age} !!!!!!!`); };
let f3 = new Foo(16);
f1.alert(); // 依旧指向旧的prototype
f2.alert(); // 依旧指向旧的prototype
f3.alert();
// 通过 f.__proto__.__proto__ 找到 Object.prototype 上的方法
f1.alert2();
f2.alert2();
f3.alert2();