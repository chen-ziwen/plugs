console.log(chrome);

// 这里面可以进行一些持久化操作
// 可以绑定一些事件
chrome.action.onClicked.addListener((tab) => {
    chrome.action.setTitle({
        tabId: tab.id,
        title: `You are on tab: ${tab.id}`
    });
});

chrome.commands.onCommand.addListener((command) => {
    if (command !== "open-tab") return;
    // 通过监听快捷键去跳转网站
    // 可以ton过
    chrome.tabs.create({ url: "http://music.chiko.website" });
});