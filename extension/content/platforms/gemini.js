/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Gemini Platform Module
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

window.platformGemini = {
  name: "Gemini",

  generateStyles(colors, isLight) {
    return `
      /* Gemini 전용 스타일 */
      body, html, main, .chat-container {
        background-color: ${colors.chatBg} !important;
        color: ${colors.chatText} !important;
      }

      /* 텍스트 가독성 */
      main *, .chat-container * {
        color: inherit !important;
      }

      nav, .navigation {
        background-color: ${colors.sidebar} !important;
      }

      header {
        background-color: ${colors.header} !important;
      }

      /* 입력창 */
      textarea, [contenteditable="true"] {
        background-color: ${colors.inputBg} !important;
        color: ${colors.chatText} !important;
      }
      
      /* 사용자 메시지 - Gemini는 구조가 다를 수 있으므로 일반적인 선택자 */
      .user-message, [data-role="user"] {
         background-color: ${colors.userBubble || "transparent"} !important;
      }
    `;
  },
};
