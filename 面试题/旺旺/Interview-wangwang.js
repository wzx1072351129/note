var interviewW = {
    title:'知乎旺旺面试题',
    con:
`
    这篇文章是对我大四秋招以来面试的总结，里面包含前端面试知识的方方面面，目前本人已经拿到腾讯offer，希望能对后面找工作的学习学妹们有所帮助。
    腾讯面试对基础比较看重，然后需要你有两三个比较好的项目，一面重视面试者对前端基础的把握，还要手写代码，不过不难，二面部门的leader面，这一面比较难，面试官会对你的项目细节进行深挖，所以说项目要牛逼一点，最后还会有一道[_逻辑题_]（我没有答上来），三面是HR面，如果你想进大公司的话，下面这些技术是肯定要掌握的：html5，css3，JavaScript，略懂一点jQuery源码，Node.js，express，mongoose，数据库mongodb。大公司问的核心在于JavaScript。如果下面的知识点你都可以打上来，恭喜你拿下bat不是问题--2016-11-11写转载请注明出处，码这么多字不容易
    [t 一、html+css部分 t]
    （1）css盒模型，可能会要求手写一个布局，这个布局基本上用到的[_css是margin的负值，boxing-sizing：border-box，_]布局尽量往这方面想。浏览器布局的基本元素是盒，在w3c的标准模式下，width=width，但是在怪异模式下，width=border*2+padding*2+width;其中后代元素的width：100%；参照的是右边的那个width，
    [t （2）html5的新特性 t]
    1、标签语义化，比如header，footer，nav，aside，article，section等，新增了很多表单元素，入email，url等，除去了center等样式标签，还有除去了有性能问题的frame，frameset等标签
    2、音视频元素，video，audio的增加使得我们不需要在依赖外部的插件就可以往网页中加入音视频元素。
    3、新增很多api，比如获取用户地理位置的window.navigator.geoloaction
    4、websocket
    websocket是一种协议，可以让我们建立客户端到服务器端的全双工通信，这就意味着服务器端可以主动推送数据到客户端.
    5、webstorage，webstorage是本地存储，存储在客户端，包括localeStorage和sessionStorage，localeStorage是持久化存储在客户端，只要用户不主动删除，就不会消失，sessionStorage也是存储在客户端，但是他的存在时间是一个回话，一旦浏览器的关于该回话的页面关闭了，sessionStorage就消失了。
    [# 6、缓存 #]
    html5允许我们自己控制哪些文件需要缓存，哪些不需要，具体的做法如下：
<pre>
    1、首先给html添加manifest属性，并赋值为cache.manifest
    2、cache.manifest的内容为:
         CACHE MANIFEST
         #v1.2
         CACHE :           //表示需要缓存的文件
           a.js
           b.js
       NETWORK:    //表示只在用户在线的时候才需要的文件，不会缓存
         c.js
       FALLBACK
       //index.html     //表示如果找不到第一个资源就用第二个资源代替
</pre>
    7、web worker，web worker是运行在浏览器后台的js程序，他不影响主程序的运行，是另开的一个js线程，可以用这个线程执行复杂的数据操作，然后把操作结果通过postMessage传递给主线程，这样在进行复杂且耗时的操作时就不会阻塞主线程了。
    [t （3）对html5的语义话的理解 t]
    html5的语义化指的是用正确的标签包含正确的内容，比如nav标签，里面就应该包含导航条的内容，而不是用做其他的用途，标签语义化的好处就是结构良好，便于阅读，方便威化，也有利于爬虫的查找，提高搜索率


`
};