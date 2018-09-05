var v1 = 1;

function Foo() {
    var init = 0;

    function Bar() {
        return init++;
    }
    return Bar;
}

var f = Foo();
f();

// 0:
// Closure (Foo) {type: "closure", name: "Foo", object: {…}}
// 1:
// Global {type: "global", name: "", object: Window}