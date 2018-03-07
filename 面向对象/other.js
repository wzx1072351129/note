var noteOther01={
    title:'javascript中面向对象的一些问题',
    con:`
[t javascript中new关键字 t]
<pre>
    function Animal(name) {
        this.name = name;

    }

    var obj = {};
    obj.__proto__ = Animal.prototype;
    var result = Animal.call(obj,"aaa");
    obj = (typeof result === 'Object'? result : obj);
</pre>

    (1)创建一个空对象obj;
    (2)把obj的__proto__ 指向Animal的原型对象prototype,
        此时便建立了obj对象的原型链：obj->Animal.prototype->Object.prototype->null
    (3)在obj对象的执行空间调用Animal函数并传递参数“cat”。
        相当于var result = obj.Animal("cat")。
    (4)如果无返回值或者返回一个非对象值,则将obj为新对象,否则会将返回值作为新对象返回

如何判断某个实例是否是根据某个构造函数创建的
    p1 instanceof Product


[t 存在的问题 t]
  * 每个实例的name,描述确实不一样,需要单独的空间存储,但是buy方法是所有实例都一样的

    理解:根据new创建实例的原理,写在构造函数中的属性,会在实例自身属性中存在.

  * 为了避免内存浪费,所以出现了原型帮助我们解决这个问题
    原型对象 不管你实例化多少次,都只生成一次

    理解:因为原型链的原因:所有的 实例 默认生成的 __proto__ 都指向构造函数的 prototype
    ,prototype原形中的方法只会定义一次,根据不同实例传入的this不同来调用

js中每个数据类型都是对象（除了null和undefined）,而每个对象都继承自另外一个对象,后者称为“原型”（prototype）对象,只有null除外,它没有自己的原型对象。

[t 原型链（prototype chain）的特点有 t]：
　　[#a#]：读取对象的某个属性时,JavaScript引擎先寻找对象本身的属性,如果找不到,就到它的原型去找,如果还是找不到,就到原型的原型(__proto__)去找。如果直到最顶层的Object.prototype还是找不到,则返回undefined。
　　[#b#]：如果对象自身和它的原型,都定义了一个同名属性,那么优先读取对象自身的属性,这叫做“覆盖”（overiding）。
        补:设置属性是直接在自身上查找属性,不会向原型链查找,没有则添加属性.
　　[#c#]：一级级向上在原型链寻找某个属性,对性能是有影响的。所寻找的属性在越上层的原型对象,对性能的影响越大。如果寻找某个不存在的属性,将会遍历整个原型链。


1.该函数 用于创建对象 其除了是一个函数之外，我们又称之为构造对象的函数 - 简称构造函数

    `
};