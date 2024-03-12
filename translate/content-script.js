// 可以往网站中注入js脚本

// 免费的谷歌翻译接口
function translate(sl, tl, raw) {
    return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${raw}`)
        .then(res => res.json())
        .then(res => {
            return res?.[0]?.[0]?.[0] || "";
        });
}

function insertAfter(newElement, targetElement) {
    let parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 递归拿到所有的文本子节点 并翻译它
function getChildNode(node) {
    if (node.nodeType == 3) {
        translate('en', 'zh-Hans', node.nodeValue).then((message) => {
            let btext = document.createTextNode(message);
            insertAfter(btext, node);
            if (getTextWidthRatio(node) > 1 / 3) {
                btext.parentNode.insertBefore(document.createElement('br'), btext);
            }
        });
    } else if (node.nodeType == 1) {
        for (let i = 0; i < node.childNodes.length; i++) {
            getChildNode(node.childNodes[i]);
        }
    }
}

//获取文本宽度，宽度达到1/3翻译文本就换行
function getTextWidthRatio(textNode) {
    var parent = textNode.parentNode;
    var span = document.createElement('span');
    span.textContent = textNode.textContent;
    parent.appendChild(span);
    var textWidth = span.offsetWidth;
    var parentWidth = parent.offsetWidth;
    parent.removeChild(span);
    return textWidth / parentWidth;
}

// 这种写法只能针对ssr页面 对于spa单文件页面无法翻译
setTimeout(() => {
    getChildNode(document.body)
}, 1000);