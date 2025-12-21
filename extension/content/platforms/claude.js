/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Claude Platform Module
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

window.platformClaude = {
  name: "Claude",

  generateStyles(colors, isLight) {
    return `
      /* Claude 전용 스타일 */
      body, html, main, [role="main"] {
        background-color: ${colors.chatBg} !important;
        color: ${colors.chatText} !important;
      }
      
      /* 텍스트 가독성 */
      main *, [role="main"] * {
        color: inherit !important;
      }

      nav, aside {
        background-color: ${colors.sidebar} !important;
      }

      header {
        background-color: ${colors.header} !important;
      }

      /* 입력창 */
      div[contenteditable="true"], textarea {
        background-color: ${colors.inputBg} !important;
        color: ${colors.chatText} !important;
        border: 1px solid ${colors.inputBorder} !important;
      }

      /* 메시지 */
      .font-claude-message, [data-testid="chat-message"] {
        color: ${colors.chatText} !important;
      }
      
      /* 사용자 메시지 */
      .font-claude-message.user {
         background-color: ${colors.userBubble || "transparent"} !important;
      }
    `;
  },
};
