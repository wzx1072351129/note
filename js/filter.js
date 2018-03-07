//str过滤事件
function filter(str) {
    return str.replace(/(<pre>[\n]?)|(<\/pre>[\n]?)|[\n\<\> ]|(\[# )|(#\])|(\[t )|(t\])|(\[_)|(_\])|(\[a )|(\|h\|)|(a\])|(\[c )|(c\])|###/g, function(match, pos, o) {
        switch (match) {
            case '<pre>': //代码嵌入
            case '<pre>\n':
                return '<pre>';
            case '<\/pre>':
            case '<\/pre>\n':
                return '<\/pre>';

            case '\n': //换行
                return '<br />';
            case '\<': //<
                return '&lt;';
            case '\>': //>
                return '&gt';
            case ' ': //空格
                return '&nbsp;';

            case '\[# ': //高亮(黄)
                return '<span class="yellow">';
            case '#\]':
                return '</span>';

            case '\[t ': //高亮(橙红)
                return '<span class="red">';
            case 't\]':
                return '</span>';

            case '\[_': //高亮(下划线)
                return '<span class="underline">';
            case '_\]':
                return '</span>';

            case '\[a ': //a标签
                return '<a href="';
            case '\|h\|':
                return '">';
            case 'a\]':
                return '</a>';

            case '\[c ': //高亮(自定义笔记)
                return '<span class="notes">';
            case 'c\]':
                return '</span>';

            case '###':
                return '<i></i>';
        }
    });
}