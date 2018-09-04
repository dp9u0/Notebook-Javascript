"use strict";

class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    get area() {
        return this.height * this.width;
    }
}

class Square extends Polygon {
    constructor(sideLength) {
        super(sideLength, sideLength);
    }
    set sideLength(newLength) {
        this.height = newLength;
        this.width = newLength;
    }
}

var square = new Square(2);

console.log(square.area);

console.log(`Square is : ${typeof Square}`);
console.log(`Polygon is : ${typeof Polygon}`);

console.log(Object.getOwnPropertyNames(square));
console.log(`实例square 的 __proto__ 为类型 Square 的prototype : ${square.__proto__ === Square.prototype}`);
console.log(Object.getOwnPropertyNames(square.__proto__)); // Square.prototype
console.log(`实例square 的 __proto__ 的 __proto__ 为类型 Polygon 的prototype : ${square.__proto__.__proto__ === Polygon.prototype}`);
console.log(Object.getOwnPropertyNames(square.__proto__.__proto__));