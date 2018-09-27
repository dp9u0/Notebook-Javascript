function foo(a, b, c, d) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
}

var arr = [1, null, , 4];
foo(...arr);