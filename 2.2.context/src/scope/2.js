var x = 10;

function Foo() {
    var x = 20;
    var bar = Function('console.log(x)');
    return bar;
}
Foo()();