// ++++begin global scope++++
var a = 10,
    b = 20;
// ++++begin Foo scope++++
function Foo() {
    var c = 10,
        d = 20;
    // ++++begin bar scope++++
    function Bar() {
        var e = 10,
            f = 20;
    }
    // ----end bar scope----
}
// ----end Foo scope----
// ----end global scope----