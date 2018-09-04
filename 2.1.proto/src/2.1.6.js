function Foo() {}
console.log(Object.getOwnPropertyNames(Foo));
console.log(Object.getOwnPropertyNames(Function.prototype));
console.log(Object.getOwnPropertyNames(Object.prototype));