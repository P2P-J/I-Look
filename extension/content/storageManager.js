/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Storage Manager (저장소 관리자)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - Chrome Storage API를 사용하여 테마 데이터를 저장하고 불러옵니다.
 * - 현재 적용된 테마를 관리합니다.
 *
 * 【주요 기능】
 * 1. loadSavedTheme(): 저장된 테마를 로드합니다.
 * 2. saveTheme(): 테마를 Chrome Storage에 저장합니다.
 * 3. getCurrentTheme(): 현재 적용 중인 테마를 반환합니다.
 *
 * 【저장 구조】
 * chrome.storage.local에 다음과 같이 저장됩니다:
 * {
 *   currentTheme: {
 *     id: "theme-id",
 *     name: "테마 이름",
 *     colors: { ... },

 *   }
 * }
 *
 * 【사용 예시】
 * ```javascript
 * // 테마 로드
 * const theme = await loadSavedTheme();
 *
 * // 테마 저장
 * await saveTheme(myTheme);
 *
 * // 현재 테마 조회
 * const current = getCurrentTheme();
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// 현재 적용 중인 테마를 메모리에 저장
let currentTheme = null;

/**
 * Chrome Storage에서 저장된 테마를 불러옵니다.
 *
 * @returns {Promise<Object|null>} 저장된 테마 객체 또는 저장된 테마가 없으면 null
 */
async function loadSavedTheme() {
  return new Promise((resolve) => {
    chrome.storage.local.get("currentTheme", (result) => {
      if (result.currentTheme && result.currentTheme.colors) {
        console.log("💾 저장된 테마 로드:", result.currentTheme.name);
        currentTheme = result.currentTheme;
        resolve(result.currentTheme);
      } else {
        console.log("⚠️ 저장된 테마가 없습니다.");
        resolve(null);
      }
    });
  });
}

/**
 * 테마를 Chrome Storage에 저장합니다.
 *
 * @param {Object} theme - 저장할 테마 객체
 * @returns {Promise<void>}
 */
async function saveTheme(theme) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ currentTheme: theme }, () => {
      if (chrome.runtime.lastError) {
        console.error("❌ 테마 저장 실패:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log("✅ 테마 저장 완료:", theme.name);
        currentTheme = theme;
        resolve();
      }
    });
  });
}

/**
 * 현재 메모리에 로드된 테마를 반환합니다.
 *
 * @returns {Object|null} 현재 테마 객체 또는 없으면 null
 */
function getCurrentTheme() {
  return currentTheme;
}

/**
 * 현재 테마를 메모리에 설정합니다 (저장하지는 않음).
 *
 * @param {Object} theme - 설정할 테마 객체
 */
function setCurrentTheme(theme) {
  currentTheme = theme;
}

// 다른 파일에서 사용할 수 있도록 함수들을 export
window.storageManager = {
  loadSavedTheme,
  saveTheme,
  getCurrentTheme,
  setCurrentTheme,
};
