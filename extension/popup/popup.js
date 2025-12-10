/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Popup Script - Main Entry Point (메인 진입점)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - Popup의 메인 진입점입니다.
 * - 모든 모듈을 통합하고 초기화를 담당합니다.
 * - 사용자 이벤트를 각 모듈의 함수로 연결합니다.
 *
 * 【의존 모듈】
 * - domManager.js: DOM 요소 관리
 * - themeRenderer.js: 프리셋 테마 렌더링
 * - customThemeManager.js: 커스텀 테마 관리
 * - colorUtils.js: 색상 유틸리티
 * - uiController.js: UI 제어
 * - themes.js: 프리셋 테마 데이터
 *
 * 【초기화 흐름】
 * 1. themes.js 로드 (SLACK_THEMES)
 * 2. Chrome Storage에서 데이터 로드
 * 3. DOM 요소 초기화
 * 4. 프리셋 테마 렌더링
 * 5. 커스텀 테마 렌더링
 * 6. 이벤트 리스너 설정
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// ━━━ 전역 상태 변수 ━━━
let currentPage = 1; // 현재 페이지 번호
let currentTheme = null; // 현재 선택된 테마
let customThemes = []; // 커스텀 테마 배열

/**
 * themes.js 파일을 동적으로 로드합니다.
 * SLACK_THEMES 전역 변수를 사용하기 위해 필요합니다.
 *
 * @returns {Promise<void>}
 */
function loadThemesScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "../content/themes.js";
    script.onload = () => {
      console.log("✅ themes.js 로드 완료");
      resolve();
    };
    script.onerror = () => {
      console.error("❌ themes.js 로드 실패");
      reject(new Error("themes.js 로드 실패"));
    };
    document.head.appendChild(script);
  });
}

/**
 * Chrome Storage에서 저장된 데이터를 불러옵니다.
 *
 * @returns {Promise<void>}
 */
async function loadSavedData() {
  try {
    const data = await chrome.storage.local.get([
      "currentTheme",
      "customThemes",
    ]);

    currentTheme = data.currentTheme || null;
    customThemes = data.customThemes || [];

    console.log("📂 저장된 데이터 로드 완료");
    console.log("  현재 테마:", currentTheme?.name || "없음");
    console.log("  커스텀 테마:", customThemes.length + "개");
  } catch (error) {
    console.error("❌ 데이터 로드 실패:", error);
  }
}

/**
 * 테마를 적용하고 Chrome Storage에 저장합니다.
 *
 * @param {Object} theme - 적용할 테마
 */
async function applyTheme(theme) {
  try {
    currentTheme = theme;

    // Chrome Storage에 저장
    await chrome.storage.local.set({ currentTheme: theme });

    // Content Script에 메시지 전송
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab) {
      chrome.tabs
        .sendMessage(tab.id, {
          action: "applyTheme",
          theme: theme,
        })
        .catch((err) => {
          console.log("⚠️ 메시지 전송 실패:", err);
        });
    }

    // UI 업데이트
    renderAll();

    console.log("🎨 테마 적용:", theme.name);
  } catch (error) {
    console.error("❌ 테마 적용 실패:", error);
  }
}

/**
 * 모든 UI를 다시 렌더링합니다.
 */
function renderAll() {
  // 프리셋 테마 렌더링
  window.themeRenderer.renderThemes(currentPage, currentTheme, applyTheme);

  // 커스텀 테마 렌더링
  window.customThemeManager.renderCustomThemes(
    customThemes,
    currentTheme,
    applyTheme,
    handleEditCustomTheme,
    handleDeleteCustomTheme
  );

  // 현재 테마 표시 업데이트
  window.themeRenderer.updateCurrentThemeDisplay(currentTheme);
}

/**
 * 커스텀 테마 수정 버튼 클릭 핸들러
 */
function handleEditCustomTheme(theme, index) {
  window.uiController.openEditModal(theme, index);
}

/**
 * 커스텀 테마 삭제 버튼 클릭 핸들러
 */
async function handleDeleteCustomTheme(index) {
  try {
    customThemes = await window.customThemeManager.deleteCustomTheme(
      index,
      customThemes
    );
    renderAll();
  } catch (error) {
    console.error("삭제 처리 실패:", error);
  }
}

/**
 * 커스텀 테마 저장 버튼 클릭 핸들러
 */
async function handleSaveCustomTheme() {
  try {
    const result = await window.customThemeManager.saveCustomTheme(
      customThemes,
      applyTheme
    );

    customThemes = result.themes;

    // UI 업데이트
    renderAll();

    // 모달 닫기
    window.uiController.closeCustomModal();

    // 내 테마 탭으로 전환
    window.uiController.switchTab("custom");
  } catch (error) {
    console.error("저장 처리 실패:", error);
  }
}

/**
 * 모든 이벤트 리스너를 설정합니다.
 */
function setupEventListeners() {
  const { elements } = window.domManager;

  // ━━━ 페이지네이션 ━━━
  elements.prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      window.themeRenderer.renderThemes(currentPage, currentTheme, applyTheme);
    }
  });

  elements.nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(
      SLACK_THEMES.length / window.themeRenderer.THEMES_PER_PAGE
    );
    if (currentPage < totalPages) {
      currentPage++;
      window.themeRenderer.renderThemes(currentPage, currentTheme, applyTheme);
    }
  });

  // ━━━ 탭 전환 ━━━
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;
      window.uiController.switchTab(targetTab);
    });
  });

  // ━━━ 커스텀 테마 모달 ━━━
  elements.createCustomBtn.addEventListener("click", () => {
    window.uiController.openCustomModal();
  });

  elements.closeModalBtn.addEventListener("click", () => {
    window.uiController.closeCustomModal();
  });

  elements.cancelBtn.addEventListener("click", () => {
    window.uiController.closeCustomModal();
  });

  // 모달 배경 클릭 시 닫기
  elements.customModal.addEventListener("click", (e) => {
    if (e.target === elements.customModal) {
      window.uiController.closeCustomModal();
    }
  });

  // ━━━ 커스텀 테마 저장 ━━━
  elements.saveCustomBtn.addEventListener("click", handleSaveCustomTheme);

  // ━━━ 색상 피커 및 미리보기 ━━━
  window.colorUtils.setupColorPickers();
  window.colorUtils.setupPreviewListeners();

  console.log("✅ 이벤트 리스너 설정 완료");
}

/**
 * Popup 초기화 함수
 * DOMContentLoaded 이벤트에서 호출됩니다.
 */
async function initialize() {
  try {
    console.log("🚀 I Look Popup 초기화 시작");

    // 1. themes.js 로드
    await loadThemesScript();

    // 2. 저장된 데이터 불러오기
    await loadSavedData();

    // 3. DOM 요소 초기화
    window.domManager.initElements();

    // 4. 모든 UI 렌더링
    renderAll();

    // 5. 이벤트 리스너 설정
    setupEventListeners();

    console.log("✅ I Look Popup 초기화 완료");
  } catch (error) {
    console.error("❌ Popup 초기화 실패:", error);
  }
}

// DOM 로드 완료 시 초기화 실행
document.addEventListener("DOMContentLoaded", initialize);
