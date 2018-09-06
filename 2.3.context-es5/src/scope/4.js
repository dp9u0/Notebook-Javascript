var v1 = 1;

{
    let init0 = 0;

    {
        let init1 = 0;

        function Foo() {
            var init = 0;

            function Bar() {
                return init0++ + init1++ + init++;
            }
            return Bar;
        }
    }

}

let f = Foo();
f();

// 0:
// Closure (Foo) {type: "closure", name: "Foo", object: {…}}
// 1:
// Block {type: "block", name: "", object: {…}}
// 2:
// Block {type: "block", name: "", object: {…}}
// 3:
// Script {type: "script", name: "", object: {…}}
// 4:
// Global {type: "global", name: "", object: Window}