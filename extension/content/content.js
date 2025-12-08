// 현재 플랫폼 감지
function detectPlatform() {
  const hostname = window.location.hostname;

  if (hostname.includes("claude.ai")) return "claude.ai";
  if (hostname.includes("chatgpt.com")) return "chatgpt.com";
  if (hostname.includes("openai.com")) return "chat.openai.com";
  if (hostname.includes("gemini.google.com")) return "gemini.google.com";
  if (hostname.includes("grok.com")) return "grok.com";

  return null;
}

// 플랫폼별 선택자
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

let lastAppliedTheme = null;
let isApplying = false;

// 테마 적용 함수
function applyTheme(theme) {
  if (isApplying) return;
  if (lastAppliedTheme?.id === theme?.id) return;

  isApplying = true;

  const platform = detectPlatform();
  if (!platform) {
    console.log("❌ 지원하지 않는 플랫폼");
    isApplying = false;
    return;
  }

  console.log(`✅ ${platform}에 테마 적용: ${theme.name}`);

  try {
    const selectors = PLATFORM_SELECTORS[platform];
    const colors = theme.colors;

    // 1. Body 배경
    document.body.style.backgroundColor = colors.chatBg;
    document.body.style.color = colors.chatText;

    // 2. 헤더 적용
    applyStylesToElements(selectors.header, {
      "background-color": colors.header,
      color: colors.chatText,
    });

    // 3. 사이드바 적용
    applyStylesToElements(selectors.sidebar, {
      "background-color": colors.sidebar,
      color: colors.chatText,
    });

    // 4. 채팅 리스트 적용
    applyStylesToElements(selectors.chatArea, {
      "background-color": colors.chatBg,
      color: colors.chatText,
    });

    // 5. 링크 색상
    const links = document.querySelectorAll('a, [role="link"]');
    links.forEach((link) => {
      link.style.color = colors.accent;
    });

    // 6. 폰트 적용
    if (theme.font && theme.font !== "system") {
      document.body.style.fontFamily = theme.font;
    }

    // 7. CSS 주입 (입력창 제외)
    injectGlobalStyles(colors);

    lastAppliedTheme = theme;
  } catch (error) {
    console.error("테마 적용 중 오류:", error);
  } finally {
    isApplying = false;
  }
}

// 요소에 스타일 적용
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
      console.log(`📝 ${elements.length}개 요소에 테마 적용`);
    }
  } catch (error) {
    console.error(`선택자 오류:`, error);
  }
}

// 글로벌 CSS 주입 (입력창 제외)
function injectGlobalStyles(colors) {
  let styleId = "i-look-theme-styles";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  // 밝은 테마 감지 (배경색의 밝기로 판단)
  const isLightTheme =
    colors.chatBg &&
    (colors.chatBg.match(/#[F-f][A-Fa-f0-9]{5}/) ||
      colors.chatBg.includes("255") ||
      colors.chatBg.toLowerCase().includes("white"));

  // 코드 블록용 배경색 계산
  let codeBlockBg, codeBlockBorder, codeBlockText;

  if (isLightTheme) {
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

  // 밝은 테마일 때 입력창 배경을 사이드바 색상으로 변경
  const inputAreaBg = isLightTheme ? colors.sidebar : colors.inputBg;

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
    
    /* 입력창 - 테마 색상 적용 */
    textarea, [contenteditable="true"], #prompt-textarea {
      background-color: ${inputAreaBg} !important;
      color: ${colors.chatText} !important;
      border: 1px solid ${colors.inputBorder} !important;
      caret-color: ${colors.chatText} !important;
      border-radius: 8px !important;
      padding: 12px !important;
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
    
    /* 입력 영역 컨테이너 */
    form, [class*="input-container"], [class*="composer"], [class*="prompt"] {
      background-color: ${inputAreaBg} !important;
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
        isLightTheme ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)"
      } !important;
    }
    
    /* box-content 입력 컨테이너 - 사이드바 색상 */
    .box-content, [class*="box-content"], [class~="bg-bg-000"] {
      background-color: ${inputAreaBg} !important;
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
      isLightTheme
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
        isLightTheme ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
      } !important;
    }
    
    th {
      font-weight: 600 !important;
      background-color: ${
        isLightTheme ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.03)"
      } !important;
    }
    
    tr:hover {
      background-color: ${
        isLightTheme ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.02)"
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

// 저장된 테마 불러오기
async function loadAndApplySavedTheme() {
  return new Promise((resolve) => {
    chrome.storage.local.get("currentTheme", (result) => {
      if (result.currentTheme && result.currentTheme.colors) {
        console.log("💾 저장된 테마 로드:", result.currentTheme.name);
        applyTheme(result.currentTheme);
      }
      resolve();
    });
  });
}

// 메시지 리스너
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "applyTheme" && message.theme) {
    applyTheme(message.theme);

    chrome.storage.local.set({ currentTheme: message.theme }, () => {
      sendResponse({ success: true });
    });
  }
  return true;
});

// DOM 변경 감지
let mutationTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(mutationTimeout);
  mutationTimeout = setTimeout(() => {
    if (lastAppliedTheme && !isApplying) {
      applyTheme(lastAppliedTheme);
    }
  }, 1000);
});

// 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", async () => {
    await loadAndApplySavedTheme();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
} else {
  loadAndApplySavedTheme().then(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
