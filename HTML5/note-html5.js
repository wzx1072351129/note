var noteHtml5={
    title:'html5基础知识',
    con:`
[t HTML标签复习 t]
        div、p、a、span、h1~h6、ul、ol、li、dl、dt、dd、input、select、label、textarea、em、i、
strong、img

    HTML5标签：(语义化)
        [# 语义化 #] 让你写的网页的标签，更接近于内容

        ul 列表 （普通的新闻列表或导航）
        ol 有序列表 （排行榜）
        dl/dt/dd  定义列表

如果想让HTML5标签兼容低版本浏览器的话，可以使用 [# html5shiv js #] 来实现。
[# *注意：一定要把它引入到前面。 #]
<pre>
兼容旧版本:
    <!-- [if lt IE 9]>
        <script src="html5shiv.min.js"></script>
    <![endif] -->

    <!--[if IE 6]>
        条件注释语句：可以一直到IE 9
    <![endif]-->

    <!--[if gt IE 6]>
        大于IE6 （不含6）
    <![endif]-->
</pre>
<pre>
标签:
    <header>头部</header>
    <nav>
        <ul>.....</ul>
    </nav>
    <main>主体内容</main>
    <footer>底部</footer>
</pre>
<pre>
<figure>
    <img src="" alt="">
    <figcaption>标题，只能是 和 figure 同时使用</figcaption>
    <p>是一些描述性的信息</p>
</figure>
</pre>
<pre>
<section>
    定义文档中的某一个区块。
        建议 section 只出现 标题（h1~h6）和内容（p）,还可以使用 Img
        一般的时候，可以用在一些展示性的列表（有标题和段落、或有标题段落和图片）
</section>
</pre>
<pre>
<input type="text" list="abcd">
<datalist id="abcd">
    <option value="10086">移动客服</option>
    <option value="10010">联通</option>
    <option value="12345">市长热线</option>
    <option value="12580">一按我帮您</option>
    <option value="114">查号</option>
    <option value="120">急救</option>
</datalist>
联想的词，是 value里面的东西，后面的提示，是 标签对中的 文字
</pre>
<pre>
<details open>      details：细节<复数>
    <summary>和details配合使用的 - 标题</summary>      summary:概要
    <p>1111111111</p>
</details>
</pre>
<pre>
audio(音乐播放):
以前要在网页上播放音频:通过 flash 来实现的 Action Script 3.0 <br>
 <audio controls autoplay muted loop preload>
    <source src="tq.ogg" type="audio/ogg">
    <source src="tq.mp3" type="audio/mpeg">
    <source src="tq.wav" type="audio/wav">
</audio>

controls    显示浏览器自带的控制条 （每个浏览器都不一样）
autoplay    自动播放
muted       静音
loop        循环
preload     预加载
当元素身上出现了autoplay默认就是预加载的
</pre>

[t href 和 src区别 t]
    href 引入资源   可以并行加载  link . href
    src  替代资源   当该文件没有加载完成的时候，不会进行后面的操作。
<pre>
video(视频播放):
<input type="button" value="播放"><br>
<video poster="i.jpg" width="600" height="400" controls id="video">
    <source src="v/mov_bbb.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    <source src="v/mov_bbb.ogv" type='video/ogg; codecs="theora, vorbis"'>
    <source src="v/mov_bbb.webm" type='video/webm; codecs="vp8, vorbis"'>
</video>

与audio一样
controls    显示浏览器自带的控制条 （每个浏览器都不一样）
autoplay    自动播放
muted       静音
loop        循环
preload     预加载
当元素身上出现了 autoplay 默认就是预加载的
poster="i.jpg"  封面（用在未播放之前的图片）
</pre>

[t 视频转换 工具 t]
            webm  狸窝
            ogv ogv转换工具
[t 表单复习 t] 以前所学的 input 的type
    text  button  submit  password  checkbox  radio  file  reset

[# HTML5新增的type #]
    date  日期
    number  在pc端 input中带上下箭头的
            在移动端 弹出来的是数字键盘、苹果自带输入法弹出来的是 全键盘（上面是1-0）
            min="0" max="40" step="2"
    range   滑动条
    search
    url
    tel

[t HTML5新增的属性 t]
    autofocus 自动聚焦
    autocomplete 是否自动完成表单
        on / off(开启/关闭)
    pattern 正则

    IOS:
    autocapitalize= "off"  关闭首字母大写
    autocorrect= "off" - 关闭iOS输入自动修正

[t 选择器 t]
    .list > li     子类选择器
    .box p + div   匹配某个元素以后的紧邻元素 （下一个元素）
    .box p ~ div   匹配某个元素 以后的 兄弟元素

[# css3选择器: #]
    :first-letter 首字母。
    :first-line 首行
    ::selection 选择器匹配被用户选取的选取是部分。
        只能向 ::selection 选择器应用少量 CSS 属性：color、background、cursor 以及 outline。
    :target 选择器可用于选取当前活动的目标元素。
        URL 带有后面跟有锚名称 #，指向文档内某个具体的元素。这个被链接的元素就是目标元素(target element)。

[t 属性选择器: t]
        div[data-hover]  匹配div 包含  某个属性的
        div[class="abc"] 匹配div class = 什么的
        div[class^="abc"]  以什么什么开头
        div[class$="abc"]  以什么什么结尾
        div[class*="abc"]  包含 什么什么 的'

        多重（多条件）  div[class*="asdf"][id][attr="123"]

[t 伪类选择器 t]
    ### 编号默认从1开始
        :nth-child(编号 | 多少倍 | 运算)    .list li:nth-child(3n - 1)
            运算符前后 必须要加空格
        :nth-last-child()    倒数
    ###:first-child     首个
        提示：p:last-child 等同于 p:nth-last-child(1)。
    ###:last-child      最后一个

    ### of-type  同类型的 第几个：
        nth-of-type()
        nth-last-of-type()

        first-of-type
        last-of-type

    ###:nth-child(odd) odd 奇数
    ###:nth-child(even) even  偶数

    ###:div p:only-child
        选择div中只有一个子元素p的 p元素
    ###:div p:only-of-type
        选择一个父元素只包含一个同类型的子元素(可有多个其他子元素)

    ###::empty
        html空，  指的是 不能含有任何的字符 （enter）
    注:div[contenteditable="true"]时使用

    ###:not()
        不是什么东西

    [# 表单的伪类选择器: #]
    :enabled     激活的
    :disabled   未被激活的
    :checked    选中的 (用label关联checkbox,radio)

###box-shadow: x y size [# 增强（可选参数） #] color;(可以添加多个)
    x轴  y轴   大小（不允许使用负值） 增强（可选参数）  颜色
text-shadow: 文字阴影
border-radius:  圆角
###calc: 计算器   width: calc(100% - 2 * 20px);
    注:100%好用

[# background: #]
    background-color:rgba();  制作背景透明
    background-size:
        x y 百分比的值
        如果x给了值，y轴默认auto

        contain (包含)
            等比例缩小 来适应元素

        cover (覆盖)
            等比例放大 填满元素
        auto
            默认 跟没写一样
        缩写(不建议)
            size 要写在 position 之后 加 /
    background-origin: 背景图像相对定位
        content-box border-box padding-box
    background-clip: 背景绘制区域(裁剪)：
        content-box border-box padding-box
    background:url(),url();(可以写多个,先写的在上面)

    background-image:
        linear-gradient(red,yellow)  颜色1 颜色2 颜色3.......
        方向：
            1 to top、to bottom 、 to right 、 to left
            2 角度：  单位 deg
               0deg  = to top
               90deg = to right
               180deg = to bottom
               270deg = to left
                正值   顺时针旋转的
               支持负值  逆时针旋转的
        repeating-linear-gradient(可重复的)
        repeating-radial-gradient
        形状：
            circle 圆形
            ellipse 椭圆
        大小：
            closest-side - 最近的边儿
            farthest-side - 最远的边儿
            closest-corner - 最近的角落
            farthest-corner - 最远的角落
        大小和形状不能同时出现

属性兼容性查看：http://caniuse.com/

    after,before:   伪元素,不是真正的元素,是一个“假”的,可以添加任何元素css

    display: -webkit-box; 弹性盒子
        (子)-webkit-box-flex:1;    均分剩余宽度： 1代表几份的意思
        -webkit-box-direction: 是否反转    direction(方向)
            reverse 反转 / normal 正常
        -webkit-box-pack: 对齐方式 (轴方向)
            start | center | end | justify
        -webkit-box-orient:  排列方式
            不给 默认为 水平
            horizontal 水平
            vertical 垂直
        -webkit-box-align: 对齐方式 (垂直于轴方向)
            start | end | center | baseline | stretch(默认值)
    display:flex;   开启弹性布局
        (子)flex: 1   均分宽度 1 份数
        -webkit-flex-direction （排列方式 - 决定主轴的方向）
            row(默认) | row-reverse | column | column-reverse
            水平方向，起点在左端 | 水平方向，起点在右端 | 垂直方向，起点在上沿| 垂直方向，起点在下沿

        (子)-webkit-flex-shrink  缩小比例
            此时剩余空间是不足时都将等比例缩小
            0 表示不参加收缩比例    若没写该属性，则为1
        (子)-webkit-flex-grow   扩展比率
            剩余空间是正值的时，伸缩项目相对于伸缩容器里其他伸缩项目能分配到空间比例
            若没写该属性，则为0    0代表不参与扩展
        justify-content（水平对齐方式）
            flex-start | flex-end | center | space-between | space-around;
            左对齐 | 右对齐 | 居中对齐 | 两端对齐(之间的间隔相等) | 每个项目两侧的间隔相等

        align-items（垂直对齐方式）
            flex-start | flex-end | center | baseline | stretch
            起点对齐 | 终点对齐 | 中点对齐 | 基线对齐 | 默认值(未设置高度或设为auto，将占满整个容器的高度)
        align-content （多行对齐方式）
            注：需要多行才行
            多根轴线的对齐方式
            flex-start | flex-end | center | space-between | space-around | stretch
            左对齐 | 右对齐 | 居中对齐 | 两端对齐(之间的间隔相等) | 每个项目两侧的间隔相等 | 轴线占满整个交叉轴
        align-self
            允许单个项目有与其他项目不一样的对齐方式
            auto | flex-start | flex-end | center | baseline | stretch
            该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
            可覆盖align-items属性
            默认值auto，表示继承父级元素的align-items，如果没有父级，则则等同于stretch
        当这两个属性遇到了
            flex-direction: column / column-reverse  整个顺序就都变了。
        flex-basis （最小宽度）
            在分配空间之前，也已经分得到空间
        flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] (连写)

    解决UC、微信兼容性问题
        安卓平台的uc和微信
            要加-webkit-
                display: flex;
                display: -webkit-box;
            flex: 1;
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                box-flex: 1;
                webkit、moz、原生

        align-items: center;
            -webkit-box-align: center;
        flex-direction: column;
        box-orient: vertical;
            webkit、moz、原生

    -webkit-user-modify(修改)
        read-only | read-write | read-write-plaintext-only   plaintext(纯文本)
        只读 | 内容可读写 | 内容可读写，但富粘贴的文本格式会丢失
    -webkit-user-select:
        auto | none | text
        用户可选内容 | 不可选 | 可选文本
    -webkit-filter(滤镜)
        blur(3px);      模糊
        brightness(.5)  亮度
        contrast(.5);   对比度
        grayscale(.5);  灰度
        hue-rotate(0deg);   色相轮
        saturate(.5);   饱和度
        sepia(.5);      褐色
        drop-shadow(x y radius color);  阴影
            drop-shadow(30px 30px 20px red);

 transform 变换
    translate   2d平移
        默认 第一个参数 x 第二个参数y 如果y没给,为0
        translateX 、translateY、translateZ(需要开启3d才能看到)支持正负值
    scale   缩放：单位 倍数
        scale(1.5)  原始（给的宽度）大小的1.5倍
        1 为 原始比例 如果没有写方向，默认是  x和y
        scaleX / Y
    rotate  旋转：
        单位 ： 角度 （deg）
        rotate  如果没去置顶xyz，默认为 z轴
        rotateX / Y / Z
    skew    斜切：
        单位：角度  支持正负值
        skew 如果没写第二个参数，默认为0
        skewX / Y
    transform-origin:  变幻的轴心  以哪个点做为 原点
        默认值是 center center
    transform-style: preserve-3d;
        flat | preserve-3d
        设置该元素在2d平面 | 3d空间
    perspective: 500px;  景深：
        值越小 代表的是我们离物体越近(一般推荐大家使用 500~800)

transition: 哪个属性动 运动在多长时间内完成 延迟时间 运动的类型;
    transition: width 5s linear, height 2s linear;
    linear          线性过渡(匀速)    跑高速的时候，一直100公里/小时
    ease            平滑过渡(缓冲)    到达目的之的时候，松开了油门
    ease-in         由慢到快(加速)    起步，踩油门
    ease-out        由快到慢(减速)    刹车了
    ease-in-out     由慢到快再到慢(先加后减 )  起步，遇到s*插队，减速

    steps(数字, start/end)     分步动画(逐帧动画)   新手，起步 熄火 起步....
    参数2未设定为 end

animation: js中的函数名  时间  延时（可选） 运动方式（linear、ease...）;
    @keyframes move {   (可以是百分比)
        /*从哪儿*/  --> 0%
        from{
            width: 100px;
        }
        /*到哪儿*/  --> 100%
        to{
            width: 300px;
        }
    }
    animation-name: move;       名称
    animation-duration: 5s;     执行时间
    animation-timing-function: initial;     运动类型
    animation-delay: initial;       延迟

    animation-iteration-count: initial;     循环次数  可选  number | infinite
    animation-direction: initial;       是否反向运动  alternate
    animation-fill-mode: initial;
        设置或检索动画时间之外的状态
        none | forwards | backwards | both
    animation-play-state: initial;      动画状态 running | paused

    transition: 5s ease-in;     贝塞尔曲线

移动端布局：
    1 纯粹的 移动端  不需要考虑任何的pc上的展示效果
        a 百分比 （不推荐使用）
        b rem  (荐)
        c viewpoint  (荐)
        d 无宽布局 （不是说永远都不给宽度）

    2 响应式（一套网站，兼容N多设备）
Viewport(可视区尺寸)
    移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域
        浏览器上(也可能是一个app中的webview)用来显示网页的那部分区域
        它可能比浏览器的可视区域要大，也可能比浏览器的可视区域要小。
        默认情况下，手机网页采用980px的宽

content 参数
    width – viewport宽度(数值/device-width)
        也可以是具体的数值
    height – viewport高度(数值/device-height)
    initial-scale – 初始缩放比例
        任意值
    user-scalable – 是否允许用户缩放(yes/no) | (0/1)
    maximum-scale – 最大缩放比例
    minimum-scale – 最小缩放比例
分类:
    IOS专用：  苹果的系统  ios
    Android   除了ios和wp以外 基本上都是安卓
    Windows Phone

css单位:
    px em % pc pt cm
    em  的字体大小 是根据父级的字体大小来计算的
        如果父级没有字体大小，往上找，找到了就用
        找不到 默认 16px
css3新单位
    rem :   root the element  (font size of the root element)
        与根目录比较(html)
    vw / vh     view width / height(浏览器窗口宽,高)
    vmax / vmin
        最大 / 最小
        不是我们所理解的  最小高度内个意思

        最小的或最大的 视窗宽高的某一个

retina  2倍 或者 3倍的屏幕
    background:-webkit-image-set(url(icon@2x.png) 2x);
    img>sreset(url(icon@2x.png) 2x);

移动端页面：
    适配（兼容），适应各个不同的设备。

    浏览器、微信（通过转发朋友圈啊）、QQ（内置浏览器）、UC
        - *米、华* 会有部分兼容问题

    不需要考虑如何兼容PC、pad

    有的公司会把pc版本和手机版分开来做
        - 数据交互量很大 （在pc上展示的内容不能完全的放到移动端）

响应式
    必须共享一套HTML结构，样式不同而已，通过设备的分辨率来自动去切换样式。
    只适用于简单的页面：博客、新闻、简单的公司门户（公司的小网站）
    `
}