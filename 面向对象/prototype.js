var notePrototype={
    title:'原型链笔记',
    con:
`[t javascript 代码运行分连个阶段: t]
    1、预解析  --- 把所有的函数定义提前,所有的变量声明提前,变量的赋值不提前
    2、执行  --- 从上到下执行  (setTimeout,setInterval,ajax中的回调函数,事件中的函数需要触发执行)

[# 结论 #]：函数的参数可以是一个函数,这个函数可以直接调用

[# 结论 #]：函数可以作为返回值
      函数的嵌套形成闭包

    js没有块作用域(for不是)

作用域:全局作用域 函数作用域

php 单引号和双引号的区别：
双引号串中的内容可以被解释而且替换,而单引号串中的内容总被认为是普通字符。

art-template:笔记

1. https://github.com/aui/art-template/wiki/syntax:simple

2. http://www.jq22.com/jquery-info1097 方法":



date 2.2
call apply :https://www.zhihu.com/question/20289071
最详尽的 JS 原型与原型链终极详解,没有「可能是」 : https://www.jianshu.com/p/dee9f8b14771

[t 一. JavaScript 中,万物皆对象 t]
    但对象也是有区别的。分为 普通对象 和 函数对象,
    Object 、Function 是 JS 自带的函数对象
<pre>
    var o1 = {};            //object
    var o2 =new Object();
    var o3 = new f1();

    function f1(){};        //function
    var f2 = function(){};
    var f3 = new Function('str','console.log(str)');

    console.log(typeof Object);   //function
    console.log(typeof Function); //function
</pre>

[# 结论 #]:凡是通过new Function()创建的对象 <都是> 函数对象(function),其他的都是普通对象(Object)。

    f1,f2,归根结底都是通过new Function()的方式进行创建的。
    Function Object 也都是通过 New Function()创建的。

[t 二. 构造函数 t]
<pre>
    console.log(person1.constructor == Person); //true
    console.log(person2.constructor == Person); //true
</pre>

    实例都有一个 constructor (构造函数)属性,该属性(是一个指针)指向构造函数(Person)

    我们要记住两个概念(构造函数,实例)：
        person1 和 person2 都是 构造函数 Person 的实例
        一个公式：
             实例的构造函数属性(constructor)指向构造函数。

[t 三. 原型对象 (主要作用是用于继承) t]
    在JavaScript中,每当定义一个对象(函数也是对象)时候,对象中都会包含一些预定义的属性。
    其中每个 <函数对象> 都有一个prototype属性,这个属性指向函数的原型对象。

    prototype原型对象,顾名思义,它就是一个 普通对象(Object) (注:Function.prototype除外)

    在默认情况下,所有的 原型对象 都会自动获得一个 constructor(构造函数)属性,这个属性(是一个指针)指向 prototype 属性所在的函数(Person)
<pre>
    person1.constructor == person   // person1 是 Person 的实例
    Person.prototype.constructor == Person     //Person.prototype也是Person 的实例

    var A = new Person();
    Person.prototype = A;   (Object)
</pre>

    [# 结论 #]：原型对象(Person.prototype)是 构造函数(Person)的一个实例。

    原型对象其实就是普通对象（Function.prototype 除外，它是函数对象，但是他没有prototype属性（违反了 函数对象都有prototype属性)
    因为 凡是通过 new Function( ) 产生的对象都是函数对象
<pre>
    var A = new Function ();
    Function.prototype = A;   (function)
</pre>

[t 四. __proto__ t]
    JS 在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做__proto__ 的内置属性，用于指向创建它的构造函数的原型对象。
    对象 person1 有一个 __proto__属性，创建它的构造函数是 Person，构造函数的原型对象是 Person.prototype ，所以：
    person1.__proto__ == Person.prototype

    不过，要明确的真正重要的一点就是，这个连接存在于实例（person1）与构造函数（Person）的原型对象（Person.prototype）之间，而不是存在于实例（person1）与构造函数（Person）之间

[t 五. 构造器 t]
    var obj = {}  <==>  var obj = new Object()

    Object Function Array Date Number String Boolean这些构造器都是函数对象：


[t 六. 原型链 t]
<pre>
    person1.__proto__ === Person.prototype
    Person.__proto__ === Function.prototype
    Person.prototype.__proto__ === Object.prototype
    Object.prototype.__proto__ === null
</pre>

    Object.prototype 对象也有__proto__属性，但它比较特殊，为 null 。因为 null 处于原型链的顶端，这个只能记住

[t 七. 函数对象 （复习一下前面的知识点） t]

    所有函数对象的proto都指向Function.prototype，它是一个空函数（Empty function）
<pre>
    Number.__proto__ === Function.prototype  // true
    Number.constructor == Function  //true

    // 所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身

    Object.__proto__ === Function.prototype  // true
    Object.constructor == Function  // true

    Function.__proto__ === Function.prototype // true
    Function.constructor == Function    //true

    // Math，JSON是以对象形式存在的，无需new。它们的proto是Object.prototype
    Math.__proto__ === Object.prototype  // true
    Math.construrctor == Object     // true
</pre>

[# 总结 #]:所有的构造器都来自于 Function.prototype，甚至包括根构造器Object及Function自身。所有构造器都继承了·Function.prototype·的属性及方法。如length、call、apply、bind
<pre>
    //Function.prototype也是唯一一个typeof 为 function的prototype
    Function.__proto__ === Function.prototype // true
</pre>

[# 总结 #]:
     原型和原型链是JS实现继承的一种模型。
     原型链的形成是真正是靠__proto__ 而非prototype

[t 原型链总结(7): t]
    __proto__:
        1.每个对象(Object,function)都有__proto__属性,没有constructor属性

        2.对象的__proto__指向 其自身的构造函数(自定义,Number,Array...) 的prototype,
            XXX.prototype是一个普通对象Object(Function.prototype除外),其__proto__指向Object.prototype
            Object.prototype===null
        3.所有new Function()的子集(函数对象function)的__proto__为空的function(Function.prototype)
        例:Array.__proto__  Number.__proto__
              自定义的 XXX.__proto__
            * Function.__proto__ === Function.prototype // true

    prototype:
        1.函数对象都有一个prototype(暂且认为是默认给的)
            注:Function.prototype虽然是空的function,但是也有.
               并且Function.prototype.__proto__===Object.prototype(保证原型链能够正常结束。)
        {
            constructor:指向自己的所在的函数(构造函数);
            __proto__:(Object)指向Object.prototype -->最终的Object.prototype._proto__===null
        }
        2.Function.prototype == 空 function

[t 自己想法 t]:
    对象默认没有constructor,只有XXX.prototype对象中存在constructor(指向本身构造函数).
    obj.constructor ==> 实际调用的是 obj.__proto__.constructor
                    ==>             Object.prototype.constructor
                    ==>             Object(){}
`
}