var v1 = 1;

function Foo() {
    var init = 0;

    function Bar() {
        return init++;
    }
    return Bar;
}

let f = Foo();
f();

// 0:
// Closure (Foo) {type: "closure", name: "Foo", object: {…}}
// 1:
// Script {type: "script", name: "", object: {…}}
// 2:
// Global {type: "global", name: "", object: Window}