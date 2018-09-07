var a = 10;

function Foo(b, c) {
    console.log(this.a);
    console.log(b);
    console.log(c);
}

Foo.call({ a: 20 }, 31, 41);
Foo.apply({ a: 30 }, [32, 42]);