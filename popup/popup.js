let Tab =  {"Title": "", "URL": ""};

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    var tab = tabs[0];
    Tab.Title = tab.title;
    Tab.URL = tab.url;
    console.log(`Title: ${Tab.Title}`);
    console.log(`URL: ${Tab.URL}`);
});

document.getElementById('tweetButton').addEventListener('click', async function () {
    var tweetContent = document.getElementById('tweetContent').value + "\n";
    var currentUrl = Tab.URL;
    var tweetUrl = 'https://twitter.com/intent/tweet';
    if (tweetContent != "") {
        tweetUrl += '?text=' + encodeURIComponent(tweetContent)
    }
    if (currentUrl != "") {
        tweetUrl += '&url=' + encodeURIComponent(currentUrl)
    }
    window.open(tweetUrl, '_blank');
});
