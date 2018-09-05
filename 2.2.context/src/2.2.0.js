var a = 10;

function Foo() {
    var init = 10;

    function Bar() {
        return ++init;
    }


    return Bar;
}
2

function test() {
    var test = 3;
    let test33 = 33;

    function test2() {
        var test2 = 3;
        let test3eqe3 = 33;

        function test3() {
            var test3 = 3 + test + test2 + test33;
        }
        test3();
    }
    test2();
    let test334 = 33;
    var test3444 = 33;
}
var f = function() {};
let b = 1; {
    let ff = function() {};
    test(); {
        let ff2 = function() {};
        test();
    }
}
test();
let f1 = Foo();
f1();
f1();