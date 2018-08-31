var foo = { x: 10 };
var bar = {
    x: 20,
    alert: function() {
        console.log(this === bar);
        console.log(this.x);
    }
}

bar.alert();
foo.alert = bar.alert;
var func = bar.alert;
var x = 30;
foo.alert();
func();