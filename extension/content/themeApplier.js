/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Theme Applier (테마 적용기)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 테마를 실제로 웹페이지에 적용하는 핵심 로직을 담당합니다.
 * - 다른 모듈들(platformDetector, styleInjector, storageManager)을 통합합니다.
 *
 * 【주요 기능】
 * 1. applyTheme(): 테마를 페이지에 적용하는 메인 함수
 * 2. 중복 적용 방지 (같은 테마를 여러 번 적용하지 않음)
 * 3. 플랫폼별로 적절한 선택자를 사용하여 스타일 적용
 *
 * 【작동 흐름】
 * 1. 플랫폼 감지 (platformDetector)
 * 2. 플랫폼별 선택자 가져오기
 * 3. Body, 헤더, 사이드바, 채팅 영역에 스타일 적용 (styleInjector)
 * 4. 링크 색상 변경
 * 5. 폰트 적용
 * 6. 전역 CSS 주입 (styleInjector)
 * 7. 테마 저장 (storageManager)
 *
 * 【사용 예시】
 * ```javascript
 * const theme = {
 *   id: 'theme-1',
 *   name: '다크 모드',
 *   colors: {
 *     chatBg: '#1A1A1A',
 *     chatText: '#FFFFFF',
 *     // ...
 *   },
 *   font: 'Roboto'
 * };
 *
 * applyTheme(theme);
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// 중복 적용 방지를 위한 플래그
let isApplying = false;

/**
 * 테마를 웹페이지에 적용합니다.
 *
 * @param {Object} theme - 적용할 테마 객체
 * @param {string} theme.id - 테마 고유 ID
 * @param {string} theme.name - 테마 이름
 * @param {Object} theme.colors - 테마 색상 객체

 * @returns {boolean} 성공 여부
 */
function applyTheme(theme) {
  // 중복 적용 방지
  if (isApplying) {
    console.log("⏳ 테마 적용 중... 대기");
    return false;
  }

  // 중복 적용 방지 로직 제거: SPA 환경에서 DOM이 뒤늦게 로드되거나 변경될 때
  // MutationObserver가 테마를 다시 적용하려고 해도 이 체크 때문에 막히는 문제가 있었음.
  // 같은 테마라도 요소가 새로 생기면 스타일을 다시 입혀야 하므로 체크를 해제함.

  // const currentTheme = window.storageManager.getCurrentTheme();
  // if (currentTheme?.id === theme?.id) {
  //   console.log("✅ 동일한 테마가 이미 적용되어 있습니다:", theme.name);
  //   return true;
  // }

  isApplying = true;

  // 1. 플랫폼 감지
  const platform = window.platformDetector.detectPlatform();
  if (!platform) {
    console.log("❌ 지원하지 않는 플랫폼입니다.");
    isApplying = false;
    return false;
  }

  console.log(`✅ ${platform}에 테마 적용: ${theme.name}`);

  try {
    const colors = theme.colors;
    const isLight = window.styleInjector.isLightTheme(colors.chatBg);

    let cssContent = "";

    // 2. 플랫폼별 스타일 생성
    if (platform === "chatgpt.com" || platform === "chat.openai.com") {
      if (window.platformChatGPT) {
        cssContent = window.platformChatGPT.generateStyles(colors, isLight);
      }
    } else if (platform === "claude.ai") {
      if (window.platformClaude) {
        cssContent = window.platformClaude.generateStyles(colors, isLight);
      }
    } else if (platform === "gemini.google.com") {
      if (window.platformGemini) {
        cssContent = window.platformGemini.generateStyles(colors, isLight);
      }
    } else if (platform === "grok.com") {
      if (window.platformGrok) {
        cssContent = window.platformGrok.generateStyles(colors, isLight);
      }
    }

    // fallback for unknown modules or errors
    if (!cssContent) {
      console.warn(
        "플랫폼 모듈을 찾을 수 없어 기본 스타일을 적용하지 않습니다."
      );
    } else {
      // 3. 스타일 주입
      window.styleInjector.injectGlobalStyles(cssContent);
    }

    // 4. 현재 테마로 설정
    window.storageManager.setCurrentTheme(theme);

    console.log("🎨 테마 적용 완료!");
    return true;
  } catch (error) {
    console.error("❌ 테마 적용 중 오류:", error);
    return false;
  } finally {
    isApplying = false;
  }
}

/**
 * 테마가 현재 적용 중인지 확인합니다.
 *
 * @returns {boolean} 적용 중이면 true
 */
function isThemeApplying() {
  return isApplying;
}

// 다른 파일에서 사용할 수 있도록 함수들을 export
window.themeApplier = {
  applyTheme,
  isThemeApplying,
};
