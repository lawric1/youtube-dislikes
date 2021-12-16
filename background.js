var enable = false;

chrome.action.onClicked.addListener((tab) => {
    enable = enable ? false : true; //Switch to true or false everytime the extension is clicked.

    if (enable) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['script.js'],
        });

        chrome.action.setBadgeText({text: 'on', tabId: tab.id });   
    } else {
        chrome.action.setBadgeText({text: '', tabId: tab.id });   
    }
});

// Reloads extension when switching pages for quick debug.
chrome.tabs.onActivated.addListener(() => {
    chrome.runtime.reload();
});
