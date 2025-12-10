/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Style Injector (스타일 주입기)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 웹페이지에 CSS 스타일을 동적으로 주입합니다.
 * - 테마 색상을 실제 DOM 요소에 적용합니다.
 * - 전역 CSS를 생성하여 <style> 태그로 삽입합니다.
 *
 * 【주요 기능】
 * 1. applyStylesToElements(): 특정 선택자의 요소들에 스타일 적용
 * 2. injectGlobalStyles(): 전역 CSS를 <style> 태그로 주입
 * 3. isLightTheme(): 색상값을 분석하여 밝은 테마인지 판별
 *
 * 【적용 범위】
 * - 헤더, 사이드바, 채팅 영역, 메시지, 입력창
 * - 코드 블록, 테이블, 링크, 스크롤바 등
 *
 * 【사용 예시】
 * ```javascript
 * // 특정 요소에 스타일 적용
 * applyStylesToElements('.sidebar', {
 *   'background-color': '#1A1A1A',
 *   'color': '#FFFFFF'
 * });
 *
 * // 전역 CSS 주입
 * injectGlobalStyles(theme.colors);
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * CSS 선택자로 요소들을 찾아 스타일을 적용합니다.
 * 입력창은 제외하고 스타일을 적용합니다.
 *
 * @param {string} selector - CSS 선택자
 * @param {Object} styles - 적용할 스타일 객체 (예: { 'background-color': '#FFF' })
 */
function applyStylesToElements(selector, styles) {
  try {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      // 입력창이면 제외
      if (
        element.matches('textarea, [contenteditable="true"], #prompt-textarea')
      ) {
        return;
      }

      Object.entries(styles).forEach(([property, value]) => {
        element.style.setProperty(property, value, "important");
      });
    });

    if (elements.length > 0) {
      console.log(`📝 ${elements.length}개 요소에 스타일 적용: ${selector}`);
    }
  } catch (error) {
    console.error(`선택자 오류 (${selector}):`, error);
  }
}

/**
 * 배경색을 분석하여 밝은 테마인지 판별합니다.
 *
 * @param {string} bgColor - 배경색 (예: "#FFFFFF" 또는 "rgb(255, 255, 255)")
 * @returns {boolean} 밝은 테마이면 true, 어두운 테마이면 false
 */
function isLightTheme(bgColor) {
  if (!bgColor) return false;

  // Hex 색상이나 밝은 색상 키워드 감지
  return (
    bgColor.match(/#[F-f][A-Fa-f0-9]{5}/) ||
    bgColor.includes("255") ||
    bgColor.toLowerCase().includes("white")
  );
}

/**
 * 테마 색상을 기반으로 전역 CSS를 생성하고 <style> 태그로 주입합니다.
 *
 * @param {Object} colors - 테마 색상 객체
 * @param {string} colors.chatBg - 채팅 배경색
 * @param {string} colors.chatText - 채팅 텍스트 색상
 * @param {string} colors.sidebar - 사이드바 배경색
 * @param {string} colors.header - 헤더 배경색
 * @param {string} colors.inputBg - 입력창 배경색
 * @param {string} colors.inputBorder - 입력창 테두리 색상
 * @param {string} colors.accent - 강조 색상
 */
function injectGlobalStyles(colors) {
  let styleId = "i-look-theme-styles";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  // 밝은 테마 감지
  const lightTheme = isLightTheme(colors.chatBg);

  // 코드 블록용 배경색 계산
  let codeBlockBg, codeBlockBorder, codeBlockText;

  if (lightTheme) {
    // 밝은 테마: 어두운 배경으로 대비
    codeBlockBg = "rgba(0, 0, 0, 0.05)";
    codeBlockBorder = colors.accent || "#CCCCCC";
    codeBlockText = "#1A1A1A";
  } else {
    // 어두운 테마: 약간 밝은 배경
    codeBlockBg = "rgba(255, 255, 255, 0.05)";
    codeBlockBorder = colors.accent || "#444444";
    codeBlockText = colors.chatText;
  }

  styleTag.textContent = `
    /* 전체 배경 */
    body {
      background-color: ${colors.chatBg} !important;
      color: ${colors.chatText} !important;
      opacity: 1 !important;
    }
    
    /* 헤더 */
    header {
      background-color: ${colors.header} !important;
      color: ${colors.chatText} !important;
    }
    
    /* 사이드바 */
    nav, aside, .sidebar, .navigation {
      background-color: ${colors.sidebar} !important;
      color: ${colors.chatText} !important;
    }
    
    /* 채팅 리스트 */
    main, [role="main"], .chat-container {
      background-color: ${colors.chatBg} !important;
      color: ${colors.chatText} !important;
      opacity: 1 !important;
    }
    
    /* 메시지 */
    .message, [data-message-author-role], [role="article"] {
      background-color: ${colors.chatBg} !important;
      color: ${colors.chatText} !important;
      opacity: 1 !important;
    }
    
    /* 입력창 - 사이드바 색상으로 불투명하게 */
    textarea, [contenteditable="true"], #prompt-textarea {
      background-color: ${colors.sidebar} !important;
      color: ${colors.chatText} !important;
      border: 1px solid ${colors.inputBorder} !important;
      caret-color: ${colors.chatText} !important;
      border-radius: 8px !important;
      padding: 12px !important;
      opacity: 1 !important;
    }
    
    /* 입력창 포커스 시 */
    textarea:focus, [contenteditable="true"]:focus, #prompt-textarea:focus {
      outline: 2px solid ${colors.accent} !important;
      outline-offset: 2px !important;
      border-color: ${colors.accent} !important;
    }
    
    /* 입력창 플레이스홀더 */
    textarea::placeholder, #prompt-textarea::placeholder {
      color: ${colors.chatText} !important;
      opacity: 0.5 !important;
    }
    
    /* 입력 영역 컨테이너 - 사이드바 색상으로 불투명하게 */
    form, [class*="input-container"], [class*="composer"], [class*="prompt"] {
      background-color: ${colors.sidebar} !important;
      opacity: 1 !important;
      border-color: ${colors.inputBorder} !important;
    }
    
    /* 입력 영역 내 버튼들 */
    form button, [class*="input-container"] button, [class*="composer"] button {
      color: ${colors.chatText} !important;
      opacity: 0.8 !important;
    }
    
    form button:hover, [class*="input-container"] button:hover, [class*="composer"] button:hover {
      opacity: 1 !important;
      background-color: ${
        lightTheme ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)"
      } !important;
    }
    
    /* box-content 입력 컨테이너 - 사이드바 색상 */
    .box-content, [class*="box-content"], [class~="bg-bg-000"] {
      background-color: ${colors.sidebar} !important;
      opacity: 1 !important;
    }
    
    /* 채팅 영역 불투명 설정 */
    main *, [role="main"] *, .chat-container * {
      opacity: 1 !important;
    }

    /* 링크 */
    a, [role="link"] {
      color: ${colors.accent} !important;
    }
    
    /* 코드 블록 컨테이너 - 테두리 제거 */
    div[class*="group"],
    div.relative.group,
    div[class*="bg-bg"],
    div[class*="code-block"] {
      background-color: ${codeBlockBg} !important;
      border: none !important;
      border-radius: 8px !important;
    }
    
    /* Pre 태그 */
    pre {
      background-color: ${codeBlockBg} !important;
      border-radius: 6px !important;
      padding: 1em !important;
      overflow-x: auto !important;
    }
    
    /* Code 태그 */
    code {
      background-color: ${codeBlockBg} !important;
      color: ${codeBlockText} !important;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
    }
    
    /* 인라인 코드 */
    p code, 
    li code,
    span code {
      background-color: ${codeBlockBg} !important;
      color: ${codeBlockText} !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      font-size: 0.9em !important;
    }
    
    /* 코드 블록 안의 코드 */
    pre code {
      background-color: transparent !important;
      padding: 0 !important;
      border-radius: 0 !important;
      display: block !important;
    }
    
    /* 문법 강조 토큰 - 밝은 테마에서 가독성 유지 */
    ${
      lightTheme
        ? `
    pre code .token {
      background-color: transparent !important;
    }
    
    pre code .token.comment,
    pre code .token.prolog,
    pre code .token.doctype {
      color: #6A737D !important;
    }
    
    pre code .token.keyword,
    pre code .token.control-flow {
      color: #D73A49 !important;
    }
    
    pre code .token.string,
    pre code .token.template-string {
      color: #032F62 !important;
    }
    
    pre code .token.function,
    pre code .token.maybe-class-name {
      color: #6F42C1 !important;
    }
    
    pre code .token.number,
    pre code .token.boolean {
      color: #005CC5 !important;
    }
    
    pre code .token.operator,
    pre code .token.arrow {
      color: #D73A49 !important;
    }
    
    pre code .token.property,
    pre code .token.property-access {
      color: #005CC5 !important;
    }
    `
        : ""
    }
    
    /* 테이블 - 채팅창 스타일 적용 */
    table {
      background-color: ${colors.chatBg} !important;
      color: ${colors.chatText} !important;
      border-collapse: collapse !important;
      width: 100% !important;
    }
    
    th, td {
      background-color: ${colors.chatBg} !important;
      color: ${colors.chatText} !important;
      padding: 8px 12px !important;
      border: 1px solid ${
        lightTheme ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
      } !important;
    }
    
    th {
      font-weight: 600 !important;
      background-color: ${
        lightTheme ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.03)"
      } !important;
    }
    
    tr:hover {
      background-color: ${
        lightTheme ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.02)"
      } !important;
    }
    
    /* 제목 태그 - 배경에 맞춘 색상 */
    h1, h2, h3, h4, h5, h6 {
      color: ${colors.chatText} !important;
    }
    
    h1 {
      font-weight: 700 !important;
    }
    
    h2 {
      font-weight: 600 !important;
    }
    
    h3, h4, h5, h6 {
      font-weight: 600 !important;
    }
    
    /* 코드 블록 헤더 (언어 표시 부분) */
    div[class*="text-text"] {
      color: ${colors.chatText} !important;
      opacity: 0.7;
    }
    
    /* 복사 버튼 */
    button[aria-label*="복사"],
    button[aria-label*="copy"] {
      opacity: 0.6 !important;
      transition: opacity 0.2s !important;
    }
    
    button[aria-label*="복사"]:hover,
    button[aria-label*="copy"]:hover {
      opacity: 1 !important;
    }
    
    /* 스크롤바 */
    ::-webkit-scrollbar {
      width: 12px;
    }
    
    ::-webkit-scrollbar-track {
      background: ${colors.chatBg} !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${colors.accent} !important;
      border-radius: 6px;
    }
  `;


}

// 다른 파일에서 사용할 수 있도록 함수들을 export
window.styleInjector = {
  applyStylesToElements,
  injectGlobalStyles,
  isLightTheme,
};
