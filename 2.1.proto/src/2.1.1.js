function Foo() {} // Foo : instance & constructor
let foo = new Foo(); // foo1 : Instance
let Bar = new Function(); //instance 相当于 function Bar(){}
let ob1 = {} // Instance 语法糖,相当于 new Object()
let ob2 = new Object(); // Instance

console.log(typeof foo); //foo是Object类型
console.log(typeof ob1); //ob1是Object类型
console.log(typeof ob2); //ob2是Object类型

console.log(typeof Foo); //Foo是Function类型
console.log(typeof Bar); //Bar是Function类型
console.log(typeof Object); //Object 是Function类型
console.log(typeof Date); //Date是Function类型
console.log(typeof Function); //Function是Function类型