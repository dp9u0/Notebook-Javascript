var a;
console.log(a); // => undefined

// var 作用域
{
    var b = 'test';
}
console.log(b); // => 'test'

// variable hoisting
console.log(c); // => undefined
var c;