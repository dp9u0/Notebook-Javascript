function Foo(x, y, z) {
    console.log(Foo.name);

    console.log(Foo.length);
    console.log(arguments.length);

    console.log(arguments.caller);
    console.log(arguments.callee === Foo);

    console.log(arguments[0] === x);
    arguments[0] = 30;
    console.log(x);
    x = 40;
    console.log(arguments[0]);
    //BUG:
    z = 50;
    console.log(arguments[2]);
    arguments[2] = 50;
    console.log(z);
}
Foo(10, 20);