var a = 10;

function Foo() {
    var b = 10;
    console.log(a);
}

function Bar(fn) {
    var a = 10;
    fn();
}
Bar(Foo);