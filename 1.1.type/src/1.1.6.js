var myPrivateMethod = Symbol();
this[myPrivateMethod] = function() {};

Symbol.keyFor(Symbol.for("tokenString")) == "tokenString"; // => true

console.log(Symbol("foo") !== Symbol("foo"));
const foo = Symbol();
const bar = Symbol();
console.log(typeof foo === "symbol");
console.log(typeof bar === "symbol");
let obj = {};
obj[foo] = "foo";
obj[bar] = "bar";
console.log(obj[foo])
console.log(obj[bar])
console.log(JSON.stringify(obj)); // {}
console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(), Symbol() ]