/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DOM Manager (DOM 요소 관리자)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - Popup HTML의 모든 DOM 요소에 대한 참조를 관리합니다.
 * - 다른 모듈들이 쉽게 DOM 요소에 접근할 수 있도록 합니다.
 *
 * 【주요 기능】
 * - elements 객체: 모든 중요한 DOM 요소들을 담고 있는 객체
 * - initElements(): DOM 요소들을 초기화하고 검증
 *
 * 【사용 예시】
 * ```javascript
 * const { elements } = window.domManager;
 * elements.themesGrid.innerHTML = '...';
 * elements.currentThemeName.textContent = 'Dark Mode';
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * Popup에서 사용하는 모든 DOM 요소 참조
 */
const elements = {
  // 프리셋 테마 관련
  themesGrid: document.getElementById("themes-grid"),
  currentPageSpan: document.getElementById("current-page"),
  totalPagesSpan: document.getElementById("total-pages"),
  prevPageBtn: document.getElementById("prev-page"),
  nextPageBtn: document.getElementById("next-page"),

  // 커스텀 테마 관련
  customThemesList: document.getElementById("custom-themes-list"),
  createCustomBtn: document.getElementById("create-custom-btn"),

  // 모달 관련
  customModal: document.getElementById("custom-modal"),
  closeModalBtn: document.getElementById("close-modal"),
  saveCustomBtn: document.getElementById("save-custom-btn"),
  cancelBtn: document.getElementById("cancel-btn"),

  // 현재 테마 표시
  currentThemeName: document.getElementById("current-theme-name"),

  // 탭
  tabs: document.querySelectorAll(".tab"),
  tabContents: document.querySelectorAll(".tab-content"),

  // 색상 입력 (커스텀 테마 모달)
  themeName: document.getElementById("theme-name"),
  colorChatBg: document.getElementById("color-chat-bg"),
  hexChatBg: document.getElementById("hex-chat-bg"),
  colorChatText: document.getElementById("color-chat-text"),
  hexChatText: document.getElementById("hex-chat-text"),
  colorSidebar: document.getElementById("color-sidebar"),
  hexSidebar: document.getElementById("hex-sidebar"),
  colorHeader: document.getElementById("color-header"),
  hexHeader: document.getElementById("hex-header"),
  colorInputBg: document.getElementById("color-input-bg"),
  hexInputBg: document.getElementById("hex-input-bg"),
  colorAccent: document.getElementById("color-accent"),
  hexAccent: document.getElementById("hex-accent"),
  fontSelect: document.getElementById("font-select"),

  // 미리보기
  previewBox: document.getElementById("preview-box"),
};

/**
 * DOM 요소들이 정상적으로 로드되었는지 확인합니다.
 *
 * @returns {boolean} 모든 필수 요소가 존재하면 true
 */
function initElements() {
  const requiredElements = [
    "themesGrid",
    "customThemesList",
    "createCustomBtn",
    "customModal",
    "currentThemeName",
  ];

  for (const key of requiredElements) {
    if (!elements[key]) {
      console.error(`❌ 필수 DOM 요소를 찾을 수 없습니다: ${key}`);
      return false;
    }
  }

  console.log("✅ DOM 요소 초기화 완료");
  return true;
}

// 다른 파일에서 사용할 수 있도록 export
window.domManager = {
  elements,
  initElements,
};
