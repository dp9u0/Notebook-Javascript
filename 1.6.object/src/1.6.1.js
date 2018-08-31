var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20


// Stage 3 proposal
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(a); // 10
console.log(b); // 20
console.log(rest); //{c: 30, d: 40}

// rename
var o = { p: 42, q: true };
var { p: foo, q: bar } = o;

console.log(foo); // 42 
console.log(bar); // true

// Default Value
var { test = 10, b = 5 } = { test: 3 };
console.log(test); // 3
console.log(b); // 5