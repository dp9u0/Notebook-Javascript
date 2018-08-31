var x = 10;

function bar() {
    console.log(this.x);
}
with({
    bar,
    x: 20,
}) {
    bar();
}