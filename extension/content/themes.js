// Slack 스타일 테마 프리셋
// Slack의 인기 테마들을 AI 사이트에 맞게 조정

const SLACK_THEMES = [
  // Page 1 (1-6)
  {
    id: "midnight-pro",
    name: "Midnight Pro",
    description: "전문가를 위한 딥 네이비",
    colors: {
      primary: "#0F111A",
      sidebar: "#0F111A",
      header: "#0F111A",
      chatBg: "#13151F",
      chatText: "#E0E6ED",
      inputBg: "#1E212E",
      inputBorder: "#3E445B",
      accent: "#7D5FFF", // Neon Violet
      stickyHeader: "#0F111A",
      userBubble: "#2C2F40", // Slightly lighter navy for user bubble
    },
  },
  {
    id: "soft-latte",
    name: "Soft Latte",
    description: "눈이 편안한 크림 라떼",
    colors: {
      primary: "#F5F1EA",
      sidebar: "#EBE5DD",
      header: "#EBE5DD",
      chatBg: "#FAF8F5",
      chatText: "#4A4036", // Deep Coffee
      inputBg: "#F0EBE4",
      inputBorder: "#D4C5B5",
      accent: "#9C6F44", // Caramel
      stickyHeader: "#EBE5DD",
      userBubble: "#EBE5DD", // Subtle beige for user bubble
    },
  },
  {
    id: "emerald-city",
    name: "Emerald City",
    description: "고급스러운 딥 그린",
    colors: {
      primary: "#062C27",
      sidebar: "#041F1C",
      header: "#041F1C",
      chatBg: "#062C27",
      chatText: "#E6F2F0",
      inputBg: "#093832",
      inputBorder: "#1A5E54",
      accent: "#34D399", // Mint Emerald
      stickyHeader: "#041F1C",
      userBubble: "#093832", // Lighter green for user bubble
    },
  },
  {
    id: "obsidian",
    name: "Obsidian",
    description: "완벽한 리얼 블랙 (OLED)",
    colors: {
      primary: "#000000",
      sidebar: "#000000",
      header: "#000000",
      chatBg: "#000000",
      chatText: "#E5E5E5",
      inputBg: "#111111",
      inputBorder: "#333333",
      accent: "#E2E8F0", // Silver
      stickyHeader: "#000000",
      userBubble: "#1A1A1A", // Dark grey for user bubble
    },
  },
  {
    id: "cyber-punk",
    name: "Cyber Punk",
    description: "미래지향적 네온",
    colors: {
      primary: "#120B2E",
      sidebar: "#090518",
      header: "#090518",
      chatBg: "#120B2E",
      chatText: "#E0E0E0",
      inputBg: "#1F1545",
      inputBorder: "#00F0FF", // Cyan
      accent: "#FF00FF", // Magenta
      stickyHeader: "#090518",
      userBubble: "#1F1545", // Deep purple for user bubble
    },
  },
  {
    id: "solarized-dark",
    name: "Solarized Dark",
    description: "개발자 친화적 다크",
    colors: {
      primary: "#002B36",
      sidebar: "#073642",
      header: "#073642",
      chatBg: "#002B36",
      chatText: "#839496",
      inputBg: "#073642",
      inputBorder: "#586E75",
      accent: "#268BD2",
    },
  },

  // Page 2 (7-12)
  {
    id: "solarized-light",
    name: "Solarized Light",
    description: "개발자 친화적 라이트",
    colors: {
      primary: "#FDF6E3",
      sidebar: "#EEE8D5",
      header: "#EEE8D5",
      chatBg: "#FDF6E3", // 따뜻한 크림
      chatText: "#073642", // 진한 청록색 (더 높은 대비)
      inputBg: "#EEE8D5", // 베이지 골드
      inputBorder: "#93A1A1", // 댬퍼드 블루그레이
      accent: "#268BD2",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    description: "인기 다크 테마",
    colors: {
      primary: "#282A36",
      sidebar: "#21222C",
      header: "#21222C",
      chatBg: "#282A36",
      chatText: "#F8F8F2",
      inputBg: "#44475A",
      inputBorder: "#6272A4",
      accent: "#BD93F9",
    },
  },
  {
    id: "nord",
    name: "Nord",
    description: "북유럽 스타일",
    colors: {
      primary: "#2E3440",
      sidebar: "#3B4252",
      header: "#3B4252",
      chatBg: "#2E3440",
      chatText: "#ECEFF4",
      inputBg: "#3B4252",
      inputBorder: "#4C566A",
      accent: "#88C0D0",
    },
  },
  {
    id: "gruvbox",
    name: "Gruvbox",
    description: "따뜻한 레트로",
    colors: {
      primary: "#282828",
      sidebar: "#3C3836",
      header: "#3C3836",
      chatBg: "#282828",
      chatText: "#EBDBB2",
      inputBg: "#3C3836",
      inputBorder: "#504945",
      accent: "#FE8019",
    },
  },
  {
    id: "one-dark",
    name: "One Dark",
    description: "Atom 에디터 스타일",
    colors: {
      primary: "#282C34",
      sidebar: "#21252B",
      header: "#21252B",
      chatBg: "#282C34",
      chatText: "#ABB2BF",
      inputBg: "#21252B",
      inputBorder: "#3E4451",
      accent: "#61AFEF",
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    description: "클래식 다크",
    colors: {
      primary: "#272822",
      sidebar: "#1E1F1C",
      header: "#1E1F1C",
      chatBg: "#272822",
      chatText: "#F8F8F2",
      inputBg: "#3E3D32",
      inputBorder: "#49483E",
      accent: "#66D9EF",
    },
  },

  // Page 3 (13-18)
  {
    id: "material",
    name: "Material",
    description: "Google Material Design",
    colors: {
      primary: "#263238",
      sidebar: "#2C393F",
      header: "#2C393F",
      chatBg: "#263238",
      chatText: "#EEFFFF",
      inputBg: "#2C393F",
      inputBorder: "#37474F",
      accent: "#80CBC4",
    },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "도쿄의 밤",
    colors: {
      primary: "#1A1B26",
      sidebar: "#16161E",
      header: "#16161E",
      chatBg: "#1A1B26",
      chatText: "#A9B1D6",
      inputBg: "#24283B",
      inputBorder: "#414868",
      accent: "#7AA2F7",
    },
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    description: "파스텔 다크",
    colors: {
      primary: "#1E1E2E",
      sidebar: "#181825",
      header: "#181825",
      chatBg: "#1E1E2E",
      chatText: "#CDD6F4",
      inputBg: "#313244",
      inputBorder: "#45475A",
      accent: "#CBA6F7",
    },
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    description: "GitHub 다크 모드",
    colors: {
      primary: "#0D1117",
      sidebar: "#161B22",
      header: "#161B22",
      chatBg: "#0D1117",
      chatText: "#C9D1D9",
      inputBg: "#161B22",
      inputBorder: "#30363D",
      accent: "#58A6FF",
    },
  },
  {
    id: "rose-pine",
    name: "Rosé Pine",
    description: "부드러운 장미빛",
    colors: {
      primary: "#191724",
      sidebar: "#1F1D2E",
      header: "#1F1D2E",
      chatBg: "#191724",
      chatText: "#E0DEF4",
      inputBg: "#26233A",
      inputBorder: "#403D52",
      accent: "#EB6F92",
    },
  },
  {
    id: "everforest",
    name: "Everforest",
    description: "숲속의 평온함",
    colors: {
      primary: "#2B3339",
      sidebar: "#323C41",
      header: "#323C41",
      chatBg: "#2B3339",
      chatText: "#D3C6AA",
      inputBg: "#323C41",
      inputBorder: "#3A464C",
      accent: "#A7C080",
    },
  },

  // Page 4 (19-24)
  {
    id: "ayu-dark",
    name: "Ayu Dark",
    description: "현대적 다크",
    colors: {
      primary: "#0A0E14",
      sidebar: "#01060E",
      header: "#01060E",
      chatBg: "#0A0E14",
      chatText: "#B3B1AD",
      inputBg: "#0F1419",
      inputBorder: "#1F2430",
      accent: "#59C2FF",
    },
  },
  {
    id: "palenight",
    name: "Palenight",
    description: "차분한 보라빛",
    colors: {
      primary: "#292D3E",
      sidebar: "#1F2233",
      header: "#1F2233",
      chatBg: "#292D3E",
      chatText: "#EEFFFF",
      inputBg: "#1F2233",
      inputBorder: "#3B3F51",
      accent: "#82AAFF",
    },
  },
  {
    id: "cobalt2",
    name: "Cobalt2",
    description: "생생한 블루",
    colors: {
      primary: "#122738",
      sidebar: "#0D1F2D",
      header: "#0D1F2D",
      chatBg: "#122738",
      chatText: "#FFFFFF",
      inputBg: "#193549",
      inputBorder: "#1F4662",
      accent: "#FFC600",
    },
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "올빼미의 밤",
    colors: {
      primary: "#011627",
      sidebar: "#010E1A",
      header: "#010E1A",
      chatBg: "#011627",
      chatText: "#D6DEEB",
      inputBg: "#0B253A",
      inputBorder: "#1D3B53",
      accent: "#7FDBCA",
    },
  },
  {
    id: "shades-of-purple",
    name: "Shades of Purple",
    description: "보라빛 그라데이션",
    colors: {
      primary: "#2D2B55",
      sidebar: "#1E1E3F",
      header: "#1E1E3F",
      chatBg: "#2D2B55",
      chatText: "#E3DFFF",
      inputBg: "#1E1E3F",
      inputBorder: "#4D21FC",
      accent: "#FAD000",
    },
  },
  {
    id: "synthwave",
    name: "Synthwave",
    description: "레트로 네온",
    colors: {
      primary: "#262335",
      sidebar: "#1A1626",
      header: "#1A1626",
      chatBg: "#262335",
      chatText: "#FFFFFF",
      inputBg: "#2A2139",
      inputBorder: "#6B3FA0",
      accent: "#FF7EDB",
    },
  },
];

// 플랫폼별 선택자
const PLATFORM_SELECTORS = {
  "claude.ai": {
    chatArea: 'main, [role="main"]',
    sidebar: "nav, aside",
    header: "header",
    inputBox: "textarea",
    messages: ".message",
  },
  "chat.openai.com": {
    chatArea: "main",
    sidebar: "nav",
    header: "header",
    inputBox: "#prompt-textarea, textarea",
    messages: "[data-message-author-role]",
  },
  "chatgpt.com": {
    chatArea: "main",
    sidebar: "nav",
    header: "header",
    inputBox: "#prompt-textarea, textarea",
    messages: "[data-message-author-role]",
  },
  "gemini.google.com": {
    chatArea: "main, .chat-container",
    sidebar: "nav, .navigation",
    header: "header",
    inputBox: "textarea",
    messages: ".message",
  },
};

console.log("✅ I Look 테마 데이터 로드 완료");
