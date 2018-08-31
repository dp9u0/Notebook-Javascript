let proto = { a: 0 };
let obj = Object.create(proto);
obj.b = 11;

let obj2 = Object.create(obj);

let obj3 = Object.create(obj);

console.log(obj2.b);
console.log(obj3.b);
obj2.b = 22;
console.log(obj2.b);
console.log(obj3.b);

let arr = [2];

let arr_ = new Array();
arr_[0] = 2;

let arr2 = Object.create(arr);
arr2['2'] = 3;
arr2[2] = 4;
arr2['t1'] = 5;
arr2.forEach(function(element, index, array) {
    console.log(element);
});
console.log('-----------------------------');

arr['2'] = 3;
arr[2] = 4;
arr['t1'] = 5;
arr.forEach(function(element, index, array) {
    console.log(element);
});

function test() {
    this.b = 3333;
}

test.prototype = { a: 2 };

let test1 = new test();

let test2 = Object.create(test1);

"use strict";

class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

class Square extends Polygon {
    constructor(sideLength) {
        super(sideLength, sideLength);
    }
    get area() {
        return this.height * this.width;
    }
    set sideLength(newLength) {
        this.height = newLength;
        this.width = newLength;
    }
}

var polygon = new Polygon(2, 1);
var square = new Square(2);