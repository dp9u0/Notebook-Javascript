# 基本语法与变量

## 基本语法

* Javascript区分大小写
* 使用Unicode字符集
* 指令称为语句,语句之间使用分号分割(也可以不使用分号,ES定义了ASI:Automatic Semicolon Insertion.但是不建议省略分号)
* 注释可以用 __//__ 也可以用 __/**/__

因此,下面是可以正常运行的:

[基本语法](./src/1.0.1.js)

```javascript
//声明一个变量 : 变量1
let 变量1 = '这是个字符串';
/*
使用console在控制台输出这个变量
console是个内置对象
在javascript运行环境,例如浏览器和node中都有实现
*/
console.log(变量1);
 ```