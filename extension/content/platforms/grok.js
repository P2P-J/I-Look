/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Grok Platform Module
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

window.platformGrok = {
  name: "Grok",

  generateStyles(colors, isLight) {
    return `
      /* Grok 전용 스타일 */
      body, html, main {
        background-color: ${colors.chatBg} !important;
        color: ${colors.chatText} !important;
      }

      /* 텍스트 가독성 */
      main * {
        color: inherit !important;
      }

      nav, aside {
        background-color: ${colors.sidebar} !important;
      }

      /* 입력창 */
      textarea {
        background-color: ${colors.inputBg} !important;
        color: ${colors.chatText} !important;
      }
    `;
  },
};
