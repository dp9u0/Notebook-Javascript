function sortRestArgs(...theArgs) {
    var sortedArgs = theArgs.sort();
    return sortedArgs;
}

alert(sortRestArgs(5, 3, 7, 1)); // 弹出 1,3,5,7

function sortArguments() {
    var sortedArgs = arguments.sort();
    return sortedArgs; // 不会执行到这里
}

alert(sortArguments(5, 3, 7, 1)); // 抛出TypeError异常:arguments.sort is not a function