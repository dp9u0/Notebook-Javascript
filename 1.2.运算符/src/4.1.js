function output1() {
    console.log('1');
    return 1;
}

function output2() {
    console.log('2');
    return 2;
}

function output3() {
    console.log('3');
    return 3;
}

function output4() {
    console.log('4');
    return 4;
}

var y = 1;
var x = y === 3 ? y === 2 ? output1() : output2() : y === 2 ? output3() : output4();

console.log(('A' ^ ' '))