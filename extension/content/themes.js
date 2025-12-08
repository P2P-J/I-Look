// Slack 스타일 테마 프리셋
// Slack의 인기 테마들을 AI 사이트에 맞게 조정

const SLACK_THEMES = [
  // Page 1 (1-6)
  {
    id: "aubergine",
    name: "Aubergine",
    description: "Slack 기본 다크 테마",
    colors: {
      primary: "#3F0E40", // 보라
      sidebar: "#350D36",
      header: "#350D36",
      chatBg: "#FAF9FA", // 부드러운 라이트 그레이
      chatText: "#1D1C1D", // 진한 검정
      inputBg: "#F4F3F4", // 약간 더 어두운 배경
      inputBorder: "#8B8085", // 보라빛 그레이
      accent: "#1164A3",
    },
  },
  {
    id: "ochin",
    name: "Ochin",
    description: "부드러운 베이지 톤",
    colors: {
      primary: "#F8F3EB",
      sidebar: "#EDE6DB",
      header: "#EDE6DB",
      chatBg: "#FFFEFB", // 따뜻한 화이트
      chatText: "#2C2926", // 진한 브라운 블랙
      inputBg: "#F8F3EB", // 베이지 톤 배경
      inputBorder: "#C4BCB0", // 베이지 그레이
      accent: "#0B4C8C",
    },
  },
  {
    id: "monument",
    name: "Monument",
    description: "모던한 그레이",
    colors: {
      primary: "#0D7E83",
      sidebar: "#052D30",
      header: "#052D30",
      chatBg: "#F8FAFA", // 시원한 그레이 화이트
      chatText: "#1A1A1A", // 진한 차콜
      inputBg: "#F0F4F5", // 청록빛 그레이
      inputBorder: "#0D7E83", // 테마 primary 색상
      accent: "#CD2553",
    },
  },
  {
    id: "hoth",
    name: "Hoth",
    description: "깔끔한 화이트",
    colors: {
      primary: "#F8F8F8",
      sidebar: "#F8F8F8",
      header: "#F8F8F8",
      chatBg: "#FEFEFE", // 순백에 가까운
      chatText: "#1A1A1A", // 진한 검정
      inputBg: "#F4F4F4", // 밝은 그레이
      inputBorder: "#B8B9BA", // 중간 그레이
      accent: "#1264A3",
    },
  },
  {
    id: "work-hard",
    name: "Work Hard",
    description: "집중력을 높이는 블루",
    colors: {
      primary: "#4D5055",
      sidebar: "#3F4147",
      header: "#3F4147",
      chatBg: "#FAFBFC", // 쿨 화이트
      chatText: "#1A1D20", // 다크 차콜
      inputBg: "#F5F6F7", // 쿨 그레이
      inputBorder: "#707478", // 미디엄 그레이
      accent: "#1164A3",
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
