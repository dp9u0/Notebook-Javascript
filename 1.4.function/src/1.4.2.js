function f(...[a, b, c]) {
    return a + b + c;
}

f(1) // NaN (b and c are undefined)
f(1, 2, 3) // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)