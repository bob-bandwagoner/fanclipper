document.getElementById('tweetButton').addEventListener('click', async function () {
    var tweetContent = document.getElementById('tweetContent').value + "\n";
    // FIXME: tabがとれなーい
    var tab = await getCurrentTab()
    var currentUrl = tab.url;
    var tweetUrl = 'https://twitter.com/intent/tweet';
    if (tweetContent != "") {
        tweetUrl += '?text=' + encodeURIComponent(tweetContent)
    }
    if (currentUrl != "") {
        tweetUrl += '&url=' + encodeURIComponent(currentUrl)
    }
    window.open(tweetUrl, '_blank');
});

async function getCurrentTab() {
    var tab
    await chrome.runtime.sendMessage({ action: "getCurrentTab" }, function (response) {
        if (response.status === 'success') {
            console.log('Current tab:', response.tab);
            tab = response.tab
        } else {
            console.error('Error:', response.error);
        }
    });
    return tab
}
