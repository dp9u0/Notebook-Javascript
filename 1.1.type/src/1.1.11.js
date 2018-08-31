// 正则表达式字面量

var re = /ab+c/;

console.log(re.test('abc'));
console.log(re.test('ababababababababc'));
console.log(re.test('acbc'));