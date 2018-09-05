var a = 10;
var ttt;

function Foo() {
    var init = 10;

    function Bar() {
        return init + create;
    }

    function Bar2() {
        return 1;
    }
    let create = 10;
    let temp = Bar();
    let temp2 = Bar2();
    return Bar2;
}


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
    let aaa = '';
    test(); {
        function test22222() {
            return aaa;
        }
        ttt = test22222;
        let ff2 = function() {};
        test();
    }
}
test();
let f1 = Foo();
const a1 = '';
f1();
f1();
const a2 = '';
var attt = 100;