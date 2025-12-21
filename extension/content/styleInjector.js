/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Style Injector (스타일 주입기) - Refactored
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 각 플랫폼 모듈이 생성한 CSS를 받아 <style> 태그로 주입합니다.
 * - 공통 유틸리티 함수(색상 분석 등)를 제공합니다.
 */

/**
 * 전역 CSS를 주입합니다.
 *
 * @param {string} cssContent - 주입할 CSS 문자열
 */
function injectGlobalStyles(cssContent) {
  let styleId = "i-look-theme-styles";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = cssContent;
  console.log("✅ Custom CSS Injected");
}

/**
 * 배경색을 분석하여 밝은 테마인지 판별합니다.
 *
 * @param {string} bgColor - 배경색
 * @returns {boolean} 밝은 테마이면 true
 */
function isLightTheme(bgColor) {
  if (!bgColor) return false;
  return (
    bgColor.match(/#[F-f][A-Fa-f0-9]{5}/) ||
    bgColor.includes("255") ||
    bgColor.toLowerCase().includes("white")
  );
}

/**
 * 특정 요소에 스타일 적용 (Legacy Support for some modules if needed)
 */
function applyStylesToElements(selector, styles) {
  // This might not be needed in new architecture but keeping empty/basic to prevent errors if called
  try {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      Object.assign(el.style, styles);
    });
  } catch (e) {
    console.error(e);
  }
}

// 다른 파일에서 사용할 수 있도록 함수들을 export
window.styleInjector = {
  injectGlobalStyles,
  isLightTheme,
  applyStylesToElements,
};
