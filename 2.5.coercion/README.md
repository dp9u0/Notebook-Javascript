# 强制类型转换

## [[ToPrimitive]]

### `ToPrimitive(input [ ,PreferredType])`

1. Assert: 检验 input.
2. 如果 Type(input) 是 Object
   1. 如果 PreferredType 没有定义, hint = "default".
   2. 否则如果 PreferredType 是 String, hint = "string".
   3. 否则 PreferredType 是 Number, hint = "number".
   4. exoticToPrim = GetMethod(input, @@toPrimitive).
   5. 如果 exoticToPrim 不是 undefined
      1. result = Call(exoticToPrim, input, [hint]).
      2. 如果 Type(result) 不是 Object, 返回 result.
      3. 否则抛出TypeError异常.
   6. 如果 hint 是 "default", hint = "number".
   7. 返回 OrdinaryToPrimitive(input, hint).
3. 返回 input.

### `OrdinaryToPrimitive(O, hint)`

1. Assert: Type(O) is Object.
2. Assert: Type(hint) 是 String 并且值为 "string" 或者 "number".
3. If hint 是 "string"
   1. methodNames = ["toString","valueOf"].
4. 否则,
   1. methodNames = ["valueOf","toString"].
5. Foreach name of methodNames
   1. method = Get(O, name). // 获取方法
   2. 如果 IsCallable(method)
      1. result = Call(method, O).
      2. 如果 Type(result) 不是 Object, 返回 result.
6. 抛出TypeError异常

总的来说,会根据上下文中的PerferType(hint) 倾向先获取 valueOf 还是 toString 作为基础类型值

## [[ToBoolean]]

| Argument Type |                          Result                           |
| :-----------: | :-------------------------------------------------------: |
|   Undefined   |                           false                           |
|     Null      |                           false                           |
|    Boolean    |                         argument                          |
|    Number     |          +0, -0, or NaN, false; otherwise true.           |
|    String     | empty String (its length is zero), false; otherwise true. |
|    Object     |                           true.                           |

## [[ToNumber]]

| Argument Type |                    Result                    |
| :-----------: | :------------------------------------------: |
|   Undefined   |                     NaN                      |
|     Null      |                      0                       |
|    Boolean    |               true:1,false:+0                |
|    Number     |               return argument                |
|    String     |                                              |
|    Object     | ToNumber(ToPrimitive(argument, hint Number)) |

## [[ToString]]

## 强制类型转换到数字

### Number()

调用 `[[ToNumber]]`

### 一元操作符 +

调用 `[[ToNumber]]`

### ~~

调用 `[[ToInt32]]`

## 强制类型转换到布尔

Boolean() => `[[ToBoolean]]`

## 强制类型转换到字符串

ToString

## 宽松相等及严格相等

宽松相等和严格相等的区别为: 宽松相等允许进行强制类型转换,而严格相等不允许.

宽松相等(`==`):

1. If Type(x) is the same as Type(y), then
    1. If Type(x) is Undefined, return true.
    2. If Type(x) is Null, return true.
    3. If Type(x) is Number, then
        1. If x is NaN, return false.
        2. If y is NaN, return false.
        3. If x is the same Number value as y, return true.
        4. If x is +0 and y is 0, return true.v. If x is -0 and y is +0, return true.
        5. Return false.
    4. If Type(x) is String, then return true if x and y are exactly the same sequence of characters (same length and same characters in corresponding positions). Otherwise, return false.
    5. If Type(x) is Boolean, return true if x and y are both true or both false. Otherwise, return false.
    6. Return true if x and y refer to the same object. Otherwise, return false.
2. If x is null and y is undefined, return true.
3. If x is undefined and y is null, return true.
4. If Type(x) is Number and Type(y) is String,return the result of the x == ToNumber(y).
5. If Type(x) is String and Type(y) is Number,return the result of the ToNumber(x) == y.
6. If Type(x) is Boolean, return the result of the ToNumber(x) == y.
7. If Type(y) is Boolean, return the result of the x == ToNumber(y).
8. If Type(x) is either String or Number and Type(y) is Object,return the result of the x == ToPrimitive(y).
9. If Type(x) is Object and Type(y) is either String or Number,return the result of the ToPrimitive(x) == y.
10. Return false