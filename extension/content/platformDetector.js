/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Platform Detector (플랫폼 감지기)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 현재 사용자가 어떤 AI 챗봇 플랫폼에 있는지 자동으로 감지합니다.
 * - 각 플랫폼별로 다른 CSS 선택자를 제공합니다.
 *
 * 【지원 플랫폼】
 * - Claude.ai
 * - ChatGPT (chatgpt.com, chat.openai.com)
 * - Google Gemini
 * - Grok
 *
 * 【주요 기능】
 * 1. detectPlatform(): 현재 URL을 분석하여 플랫폼 식별
 * 2. getPlatformSelectors(): 특정 플랫폼의 CSS 선택자 반환
 *
 * 【사용 예시】
 * ```javascript
 * const platform = detectPlatform();
 * if (platform) {
 *   const selectors = getPlatformSelectors(platform);
 *   // selectors.sidebar, selectors.chatArea 등 사용
 * }
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// 플랫폼별 CSS 선택자 정의
// 각 플랫폼마다 DOM 구조가 다르므로, 적절한 선택자를 미리 정의해둡니다.
const PLATFORM_SELECTORS = {
  "claude.ai": {
    root: "html",
    chatArea: 'main, [role="main"]',
    sidebar: "nav, aside, .sidebar",
    header: "header",
    inputBox: 'textarea, [contenteditable="true"]',
    messages: '.message, [data-testid*="message"]',
  },
  "chat.openai.com": {
    root: "html",
    chatArea: "main",
    sidebar: "nav",
    header: "header",
    inputBox: "#prompt-textarea, textarea",
    messages: "[data-message-author-role]",
  },
  "chatgpt.com": {
    root: "html",
    chatArea: "main",
    sidebar: "nav",
    header: "header",
    inputBox: "#prompt-textarea, textarea",
    messages: "[data-message-author-role]",
  },
  "gemini.google.com": {
    root: "html",
    chatArea: "main, .chat-container",
    sidebar: "nav, .navigation",
    header: "header",
    inputBox: 'textarea, [contenteditable="true"]',
    messages: '.message, [role="article"]',
  },
  "grok.com": {
    root: "html",
    chatArea: 'main, [role="main"]',
    sidebar: "nav, aside, .sidebar",
    header: "header",
    inputBox: 'textarea, [contenteditable="true"]',
    messages: '.message, [data-testid*="message"]',
  },
};

/**
 * 현재 웹페이지의 호스트네임을 분석하여 플랫폼을 감지합니다.
 *
 * @returns {string|null} 플랫폼 이름 (예: "claude.ai") 또는 지원하지 않는 플랫폼일 경우 null
 */
function detectPlatform() {
  const hostname = window.location.hostname;

  if (hostname.includes("claude.ai")) return "claude.ai";
  if (hostname.includes("chatgpt.com")) return "chatgpt.com";
  if (hostname.includes("openai.com")) return "chat.openai.com";
  if (hostname.includes("gemini.google.com")) return "gemini.google.com";
  if (hostname.includes("grok.com")) return "grok.com";

  return null;
}

/**
 * 특정 플랫폼의 CSS 선택자를 반환합니다.
 *
 * @param {string} platform - 플랫폼 이름 (예: "claude.ai")
 * @returns {Object|null} 선택자 객체 또는 플랫폼을 찾을 수 없는 경우 null
 */
function getPlatformSelectors(platform) {
  return PLATFORM_SELECTORS[platform] || null;
}

// 다른 파일에서 사용할 수 있도록 함수들을 export
// (Chrome Extension의 Content Script는 전역 스코프를 공유합니다)
window.platformDetector = {
  detectPlatform,
  getPlatformSelectors,
};
