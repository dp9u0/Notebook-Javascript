let a;
console.log(a); // => undefined

// let 作用域
{
    let b = 'test';
}
console.log(b); // => Uncaught ReferenceError : b is not defined

// variable hoisting
console.log(c); // => Uncaught ReferenceError : c is not defined
let c;