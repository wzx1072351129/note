"use strict";

var EventUtil = {
    addListener: function(target, type, handle) {
        if (target.addEventListener) {
            target.addEventListener(type, handle);
        } else if (target.attachEvent) {
            target.attachEvent('on' + type, function() {
                handle.call(target);
            });
        } else {
            target['on' + type] = handle;
        }
    },
    removeListener: function(target, type, handle) {
        if (target.removeEventListener) {
            target.removeEventListener(type, handle);
        } else if (target.detachEvent) {
            target.detachEvent('on' + type, handle);
        } else {
            target['on' + type] = null;
        }
    },
    getEvent: function(e) {
        return e|| window.event ;
    },
    getTarget:function(e){
        e = e || window.event;
        return e.target || e.srcElement;
    },

}

//用于存储刷新是上次看到的滚动条和标签
//初始化0,没有保存是从头显示
var contentBoxTop = 0;
var globalIndex = 0;

EventUtil.addListener(window, 'load', load);

function load() {
    var oCatalog = document.querySelector('.catalog'),
        oCon = document.querySelector('.content');
    //添加笔记数
    addNoteDate();
    //之后获取目录|内容列表
    var aLi = oCatalog.querySelectorAll('li'),
        aConbox = oCon.querySelectorAll('.unit-con');


    console.log(aLi);
    console.log(localStorage.tagIndex);
    //初始化签被选中
    if(localStorage.contentBoxTop){
        //bug :
        //  修改html内容长度,缩短时,有可能造成loaclStorage.tagIndex
        //  存储值大于li长度造成错误(obj.className等属性访问不到)
        globalIndex=localStorage.tagIndex
        aLi[globalIndex].className='sel';
        oCon.scrollTop=localStorage.contentBoxTop;
    }
    addSubTag();
    addMouseEvent();
    addConScrollEvent();

    //添加笔记数据事件
    function addNoteDate(){
        var taghtml='',conhtml='';
        for(var i=0,len=Note.length;i<len;i++){
            var taglist='',conlist='';
            for(var j=0;j<Note[i].content.length;j++){
                taglist+='<li><span>'+Note[i].content[j].title+'</span>'+
                            '<div class="sub"></div>'+
                        '</li>';
                conlist+='<div class="unit-con">'+
                         '     <h4 class="b-t">'+Note[i].content[j].title+'</h4>'+
                         '     <div class="b-c">'+filter(Note[i].content[j].con)+'</div>'+
                         '</div>';
            }
            taghtml+='<div class="unit">'+
                     '   <p class="title">'+Note[i].unit+'</p>'+
                     '   <ul class="con">'+
                             taglist +
                     '   </ul>'+
                     '</div>';
            conhtml+='<div class="box">'+
                         conlist +
                     '</div>';

        }
        oCatalog.innerHTML=taghtml;
        oCon.innerHTML=conhtml;
    }
    // 件笔记中的 [t***t](.red) 嵌入目录,成为子目录
    function addSubTag(){
        var i,len;
        //aLi与aConbox长度是相等的
        for(i=0,len=aLi.length;i<len;i++){
            var subs=aConbox[i].querySelector('div').querySelectorAll('.red');
            var subshtml='';
            for(var j=0;j<subs.length;j++){
                subshtml+='<span>'+subs[j].innerText+'</span>'
            }
            aLi[i].querySelector('.sub').innerHTML=subshtml;
        }
    }

     //目录添加鼠标移入与点击事件
    function addMouseEvent() {
        var aLiSubSpan;
        var i, len;
        for (i = 0, len = aLi.length; i < len; i++) {
            aLi[i].index = i;
            EventUtil.addListener(aLi[i], 'click', clickEvent);
            EventUtil.addListener(aLi[i], 'mouseenter', enterEvent);
            EventUtil.addListener(aLi[i], 'mouseleave', leaveEvent);
            //获取所有的子标签
            aLiSubSpan=aLi[i].querySelectorAll('.sub span');
            for(var j=aLiSubSpan.length-1;j>=0;j--){
                aLiSubSpan[j].subIndex=j;
                EventUtil.addListener(aLiSubSpan[j], 'click', subClickEvent);
            }
        }
        //li点击事件(scroll跳转)
        function clickEvent(e) {
            //先判断一下现在点击的是不是sub目录
            var target=EventUtil.getTarget(e);
            //有可能是点击span上
            if(this==target||this==target.parentNode){
                console.log(this);
                console.log(this.className);
                aLi[globalIndex].className = '';
                this.className = 'sel';
                globalIndex = this.index;
                //全局存储笔记看的进程
                contentBoxTop=aConbox[globalIndex].offsetTop
                //content滚动
                scrollAnimation(oCon,contentBoxTop , 300);
            }
        }
        //li移入(显示sub事件)
        function enterEvent(){
            var aLiSub=this.querySelector('.sub');
            clearTimeout(this.subtId);
            //理由节流的思路.设置延时<子标签>显示
            this.subtId=setTimeout(function(){
                aLiSub.style.display="block";
            },500);
        }
        //li移出(隐藏sub事件)
        function leaveEvent(){
            clearTimeout(this.subtId);
            this.querySelector('.sub').style.display="none";
        }
        //sub点击事件(sub-->span 跳转)
        function subClickEvent(){
            var parent=this.parentNode.parentNode;
            aLi[globalIndex].className = '';
            parent.className = 'sel';
            globalIndex = parent.index;
            //全局存储笔记看的进程
            //获取 aConbox[x]-->所有的[t***t](.red)[y]的offsetTop
            contentBoxTop=aConbox[globalIndex].querySelectorAll('.red')[this.subIndex].offsetTop-10;
            scrollAnimation(oCon,contentBoxTop , 300);
        }
    }

    //内容区滚动映射标签事件
    function addConScrollEvent() {

        EventUtil.addListener(oCon, 'scroll', function(){
            throttle(scrollEvent,oCon)
        });
        function scrollEvent() {
            //全局存储笔记看的进程
            if(typeof this.lastScroll == 'undefined')this.lastScroll=0;
            contentBoxTop=this.scrollTop;
            var posy = this.scrollTop,
                item,
                i,len;
            var screenHeight=oCon.offsetHeight;

            aLi[globalIndex].className = '';
            for (i = 0, len = aConbox.length; i < len; i++) {
                item = aConbox[i];
                //这个是判断当next标签滚出屏幕就将globalIndex设为当前的看到的
                //(问题:有可能当前看到的没有 屏幕的高度 高)
                //但是下面的if可在检测这种情况覆盖掉上边这个检测

                if(contentBoxTop>this.lastScroll){
                    if (posy < item.offsetTop && posy > item.offsetTop - screenHeight / 3){
                        globalIndex = i;
                        break;
                    }
                }else{
                    if (posy < item.offsetTop + item.offsetHeight/3*2 ) {
                        globalIndex = i;
                        break;
                    }
                }
            }
            console.log(contentBoxTop>this.lastScroll);
            aLi[globalIndex].className = 'sel';
            this.lastScroll=contentBoxTop;
        }
    }

    //函数节流
    function throttle(match, context, time) {
        var times = typeof time == 'number' ? time : 100;
        clearTimeout(context.tId);
        context.tId = setTimeout(function() {
            match.call(context);
        }, times);
    }

    // 自定义的scroll滚动事件
    // 这个事件会触发元素的 onscroll 事件
    function scrollAnimation(element, posy, times) {
        var startTop = element.scrollTop,
            dist = Math.floor((posy - startTop) / (times / 13)),
            newTop,
            i = 1;
        var timer = setInterval(function() {
            newTop = startTop + dist * i;
            if (dist > 0) {
                if (newTop >= posy) {
                    newTop = posy;
                    clearInterval(timer);
                }
            } else {
                if (newTop <= posy) {
                    newTop = posy;
                    clearInterval(timer);
                }
            }
            element.scrollTop = newTop;
            i++
        }, 13);
    }

}

EventUtil.addListener(window,'unload',unload);
function unload(){
    localStorage.setItem('contentBoxTop',contentBoxTop);
    localStorage.setItem('tagIndex',globalIndex);
}
