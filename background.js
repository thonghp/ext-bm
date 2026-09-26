chrome.runtime.onInstalled.addListener(() => {
  console.log("FB Business Helper Extension đã được cài đặt thành công.");
});

// Lắng nghe Message từ Popup hoặc Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleToolbar") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "renderToolbar" });
      }
    });
    sendResponse({ status: "ok" });
  }
});
