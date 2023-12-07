function takeScreenshot() {
    // YouTubeのビデオ要素を取得
    const videoElement = document.querySelector('video');
    if (!videoElement) {
        console.error('ビデオ要素が見つかりません。');
        return;
    }

    // キャンバスを作成し、ビデオのフレームを描画
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // キャンバスから画像データを取得
    const imageData = canvas.toDataURL('image/png');

    // ポップアップにデータを送信
    chrome.runtime.sendMessage({ image: imageData });
}

// FIXME: 新規タブでリロードをしないとサービスワーカーへメッセージを送れない
// ポップアップからのメッセージをリッスンし、スクリーンショットを取る
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "takeScreenshot") {
            takeScreenshot();
        }
    }
);

