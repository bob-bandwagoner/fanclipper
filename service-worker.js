async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "getCurrentTab") {
            getCurrentTab().then(tab => {
                sendResponse({ status: 'success', tab: tab });
            }).catch(error => {
                sendResponse({ status: 'error', error: error });
            });
            return true; // 非同期レスポンスを示す
        }
    }
);
