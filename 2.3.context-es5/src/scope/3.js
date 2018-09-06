var v1 = 1;

function Foo() {

    function Bar() {
        var init = 0;
        return init++;
    }
    return Bar;
}

let f = Foo();
f();

// 0:
// Script { type: "script", name: "", object: {…} }
// 1:
// Global { type: "global", name: "", object: Window }