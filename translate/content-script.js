// 可以往网站中注入js脚本

// 免费的谷歌翻译接口
function translate(sl, tl, raw) {
    return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${raw}`)
        .then(res => res.json())
        .then(res => {
            return res[0]?.[0]?.[0]
        });
}

// 递归拿到所有的文本子节点 并翻译它
function getChildNode(node, text) {
    if (node.nodeType == 3) {
        translate('en', 'zh-Hans', node.nodeValue).then((message) => {
            node.nodeValue = message;
        });
    } else if (node.nodeType == 1) {
        for (let i = 0; i < node.childNodes.length; i++) {
            getChildNode(node.childNodes[i], text);
        }
    }
}

// 这种写法只能针对ssr页面 对于spa单文件页面无法翻译
// 除非能监听到网站的跳转 每次跳转都翻译下
// 这个代码就是写着玩的 朋友想要这个效果 写个demo
getChildNode(document.body);

setTimeout(() => {
    getChildNode(document.body)
}, 2000);