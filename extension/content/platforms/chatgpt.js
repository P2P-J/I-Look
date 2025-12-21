/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ChatGPT Platform Module
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

window.platformChatGPT = {
  name: "ChatGPT",

  /**
   * ChatGPT 전용 스타일을 생성합니다.
   * @param {Object} colors - 테마 색상 객체
   * @param {boolean} isLight - 밝은 테마 여부
   * @returns {string} CSS 문자열
   */
  generateStyles(colors, isLight) {
    // 1. 기본 색상 변수 설정
    const css = `
      :root {
        --theme-primary: ${colors.primary};
        --theme-sidebar: ${colors.sidebar};
        --theme-header: ${colors.header};
        --theme-chat-bg: ${colors.chatBg};
        --theme-chat-text: ${colors.chatText};
        --theme-input-bg: ${colors.inputBg};
        --theme-input-border: ${colors.inputBorder};
        --theme-accent: ${colors.accent};
      }

      /* 기본 배경 및 텍스트 */
      body, html {
        background-color: ${colors.chatBg} !important;
        color: ${colors.chatText} !important;
      }

      /* 메인 채팅 영역 */
      main, [role="main"], .chat-container {
        background-color: ${colors.chatBg} !important;
        color: ${colors.chatText} !important;
        opacity: 1 !important;
      }

      /* 텍스트 가독성 강제 적용 (밝은 테마 대응) */
      main *, [role="main"] * {
        color: inherit !important;
        border-color: ${colors.inputBorder}; 
      }
      
      /* 특정 텍스트 요소 강제 색상 */
      main p, main span, main div, main h1, main h2, main h3, main h4, main h5, main h6, main li {
        color: ${colors.chatText} !important;
      }

      /* 링크는 강조색 유지 */
      a, [role="link"], a *, [role="link"] * {
        color: ${colors.accent} !important;
      }

      /* 사이드바 */
      nav, .sidebar {
        background-color: ${colors.sidebar} !important;
        color: ${colors.chatText} !important;
      }

      /* 헤더 */
      header {
        background-color: ${colors.header} !important;
        color: ${colors.chatText} !important;
      }

      /* Sticky Header (상단 고정 영역) */
      .sticky.top-0, .content-fade-top, .offset-padding-top-4.sticky {
        background-color: ${colors.stickyHeader || colors.chatBg} !important;
        color: ${colors.chatText} !important;
      }

      /* 입력창 영역 */
      #prompt-textarea, textarea, [contenteditable="true"] {
        background-color: ${colors.inputBg} !important;
        color: ${colors.chatText} !important;
        border: 1px solid ${colors.inputBorder} !important;
      }
      
      /* 입력창 하단 푸터 배경 제거 */
      [view-transition-name*="disclaimer"],
      .text-xs.text-center, 
      div[class*="disclaimer"],
      div[class*="footer"] {
        background-color: transparent !important;
      }

      /* 사용자 말풍선 (User Bubble) */
      [data-message-author-role="user"] {
        background-color: ${colors.userBubble || "transparent"} !important;
      }

      /* 버튼 호버 */
      form button:hover {
        background-color: ${
          isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"
        } !important;
      }
      
      /* .bg-bg-300 (기타 패널 등) - 사이드바 색상으로 통일 */
      .bg-bg-300 {
        background-color: ${colors.sidebar} !important;
      }
    `;

    return css;
  },
};
