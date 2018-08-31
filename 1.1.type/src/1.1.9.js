//对象字面量
var car = { manyCars: { a: "Saab", "b": "Jeep" }, 7: "Mazda" };
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda

// 增强对象字面量 ES6
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
        // Super calls
        return "d " + super.toString();
    },
    // Computed (dynamic) property names
    ['prop_' + (() => 42)()]: 42
};