/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Content Script - Main Entry Point (메인 진입점)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - Content Script의 메인 진입점입니다.
 * - 모든 모듈을 통합하고 초기화를 담당합니다.
 * - Chrome Extension 메시지 리스너를 등록합니다.
 * - DOM 변경을 감지하여 테마를 다시 적용합니다.
 *
 * 【의존 모듈】
 * - platformDetector.js: 플랫폼 감지
 * - storageManager.js: 저장소 관리
 * - styleInjector.js: 스타일 주입
 * - themeApplier.js: 테마 적용
 *
 * 【초기화 흐름】
 * 1. DOM 로드 대기
 * 2. 저장된 테마 불러오기
 * 3. 테마 적용
 * 4. DOM 변경 감지 시작
 * 5. 메시지 리스너 등록
 *
 * 【메시지 수신】
 * Popup에서 "applyTheme" 메시지를 받으면 테마를 적용합니다.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * 저장된 테마를 불러와서 페이지에 적용합니다.
 */
async function loadAndApplySavedTheme() {
  try {
    const savedTheme = await window.storageManager.loadSavedTheme();
    if (savedTheme) {
      window.themeApplier.applyTheme(savedTheme);
    } else {
      console.log("💡 저장된 테마가 없습니다. 기본 스타일을 유지합니다.");
    }
  } catch (error) {
    console.error("❌ 테마 로드 실패:", error);
  }
}

/**
 * Chrome Extension 메시지 리스너
 * Popup에서 테마 변경 메시지를 받으면 처리합니다.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "applyTheme" && message.theme) {
    console.log("📨 Popup에서 테마 적용 요청 받음:", message.theme.name);

    // 테마 적용
    const success = window.themeApplier.applyTheme(message.theme);

    // 테마 저장
    if (success) {
      window.storageManager
        .saveTheme(message.theme)
        .then(() => {
          sendResponse({ success: true });
        })
        .catch((error) => {
          console.error("테마 저장 실패:", error);
          sendResponse({ success: false, error: error.message });
        });
    } else {
      sendResponse({ success: false, error: "테마 적용 실패" });
    }

    return true; // 비동기 응답을 위해 true 반환
  }
});

/**
 * DOM 변경 감지기
 * 페이지의 DOM이 변경되면 테마를 다시 적용합니다.
 * (일부 플랫폼은 동적으로 요소를 추가하므로 필요)
 */
let mutationTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(mutationTimeout);
  mutationTimeout = setTimeout(() => {
    const currentTheme = window.storageManager.getCurrentTheme();
    if (currentTheme && !window.themeApplier.isThemeApplying()) {
      console.log("🔄 DOM 변경 감지, 테마 재적용");
      window.themeApplier.applyTheme(currentTheme);
    }
  }, 1000); // 1초 대기 후 재적용 (과도한 재적용 방지)
});

/**
 * 초기화
 * DOM이 준비되면 실행됩니다.
 */
async function initialize() {
  console.log("🚀 I Look Extension 초기화 시작");

  // 1. 저장된 테마 불러오기 및 적용
  await loadAndApplySavedTheme();

  // 2. DOM 변경 감지 시작
  observer.observe(document.body, {
    childList: true, // 자식 노드 추가/삭제 감지
    subtree: true, // 하위 모든 노드 감지
  });

  console.log("✅ I Look Extension 초기화 완료");
}

// DOM 로드 상태에 따라 초기화
if (document.readyState === "loading") {
  // 아직 로딩 중이면 DOMContentLoaded 이벤트 대기
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  // 이미 로드되었으면 바로 실행
  initialize();
}
