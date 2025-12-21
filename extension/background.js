// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  // 초기값 설정
  chrome.storage.local.get("currentTheme", (result) => {
    if (!result.currentTheme) {
      chrome.storage.local.set({ currentTheme: null });
    }
  });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  // 탭 변경 시 현재 테마 적용
  chrome.storage.local.get("currentTheme", (result) => {
    if (result.currentTheme) {
      chrome.tabs
        .sendMessage(activeInfo.tabId, {
          action: "applyTheme",
          theme: result.currentTheme,
        })
        .catch(() => {
          console.log("메시지 전송 실패 - 페이지가 아직 로드되지 않음");
        });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 페이지 로드 완료 시 테마 적용 (새로고침 대응)
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("currentTheme", (result) => {
      if (result.currentTheme) {
        chrome.tabs
          .sendMessage(tabId, {
            action: "applyTheme",
            theme: result.currentTheme,
          })
          .catch(() => {
            console.log("메시지 전송 실패 - 탭이 닫혔거나 권한 없음");
          });
      }
    });
  }
});
