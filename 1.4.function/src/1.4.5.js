function* createIterator() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2 : first = 4 是 next(4) 将参数赋值的
    yield second + 3; // 5 + 3 : second = 4 是 next(45) 将参数赋值的
}

let iterator = createIterator();

console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.next(5)); // "{ value: 8, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"