global.a = 'ooops, global';

function foo() {
  console.log(this.a);
}

// 默认绑定
console.log('默认绑定');
foo(); //true

// 隐式绑定
console.log('隐式绑定');
var obj1 = {
  a: 'ooops, obj1',
  foo: foo,
  obj2: {
    a: 'ooops, obj2',
    foo: foo
  }
}
//foo()函数的直接对象是obj1,this隐式绑定到obj1
obj1.foo(); //1
//foo()函数的直接对象是obj2,this隐式绑定到obj2
obj1.obj2.foo(); //2

// 隐式绑定丢失:函数别名
var obj3 = {
  a: 'ooops, obj3',
  foo: foo
}
//把obj.foo赋予别名bar,造成了隐式丢失,因为只是把foo()函数赋给了bar,而bar与obj对象则毫无关系
console.log('隐式绑定丢失:函数别名');
var bar = obj3.foo;
bar(); //0

// 隐式绑定丢失:参数传递
console.log('隐式绑定丢失:参数传递');

function bar(fn) {
  fn();
}
var obj4 = {
  a: 'ooops, obj4',
  foo: foo
}
//把obj.foo当作参数传递给bar函数时,有隐式的函数赋值fn=obj.foo。与上例类似,只是把foo函数赋给了fn,而fn与obj对象则毫无关系
bar(obj4.foo); //0

// 显式绑定
console.log('显式绑定');
var obj5 = {
  a: 'ooops, obj5',
};
foo();
foo.call(obj5);

// API 函数绑定
console.log('API 函数绑定');
var obj6 = {
  a: 'ooops, obj6',
};
[1, 2, 3].forEach(foo); //1 "ooops, global" 2 "ooops, global" 3 "ooops, global"
[1, 2, 3].forEach(foo, obj6); //1 "fn" 2 "fn" 3 "fn"

// new绑定
console.log('new绑定');
let newObj = new foo();