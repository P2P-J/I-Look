# I Look

**AI를 내 스타일대로** - AI 사이트를 위한 테마 커스터마이저

Claude, ChatGPT, Gemini를 Slack 스타일 테마와 나만의 커스텀 테마로 꾸며보세요!

---

## ✨ 주요 기능

### 1️⃣ 24개 Slack 스타일 프리셋 테마

- Aubergine, Ochin, Monument, Hoth...
- Solarized, Dracula, Nord, Gruvbox...
- Material, Tokyo Night, GitHub Dark...
- 그 외 인기 개발자 테마 다수!

### 2️⃣ 커스텀 테마 만들기

- **구역별 색상 선택**

  - 채팅 영역 (배경 + 텍스트)
  - 사이드바
  - 헤더
  - 입력창
  - 강조 색상

- **폰트 선택**

  - Pretendard
  - Noto Sans KR
  - Spoqa Han Sans Neo
  - IBM Plex Sans KR

- **실시간 미리보기**

  - 색상 변경 즉시 확인

- **테마 저장**
  - 이름 붙여서 저장
  - 내 테마 목록에서 관리

### 3️⃣ 자동 적용

- 선택한 테마 자동 저장
- 브라우저 재시작 후에도 유지
- 페이지 새로고침 불필요

---

## 🚀 설치 방법

### Step 1: 다운로드

```
i-look/extension 폴더를 다운로드하세요
```

### Step 2: Chrome 확장 프로그램 로드

```
1. chrome://extensions/ 열기
2. 개발자 모드 켜기 (우측 상단)
3. "압축해제된 확장 프로그램을 로드합니다" 클릭
4. i-look/extension 폴더 선택
5. 완료!
```

---

## 📖 사용 방법

### 프리셋 테마 적용

1. AI 사이트 방문 (claude.ai, chatgpt.com, gemini.google.com)
2. 툴바에서 I Look 아이콘 클릭
3. 원하는 테마 클릭
4. 즉시 적용! ✨

### 커스텀 테마 만들기

```
1. I Look 팝업 열기
2. "직접 커스터마이징하기" 버튼 클릭
3. 테마 이름 입력
4. 구역별 색상 선택
   - 색상 피커 또는 Hex 코드 입력
5. 폰트 선택
6. 미리보기 확인
7. "저장하기" 클릭
8. "내 테마" 탭에서 확인!
```

---

## 🎨 인기 테마

### 다크 테마

- **Aubergine** - Slack 기본 다크
- **Dracula** - 개발자 인기 1위
- **Tokyo Night** - 일본풍 다크
- **Nord** - 북유럽 스타일

### 라이트 테마

- **Hoth** - 깔끔한 화이트
- **Ochin** - 부드러운 베이지
- **Solarized Light** - 개발자 친화적

### 컬러풀 테마

- **Synthwave** - 레트로 네온
- **Shades of Purple** - 보라빛 환상
- **Gruvbox** - 따뜻한 레트로

---

## 🌐 지원 사이트

| 사이트       | URL               | 상태 |
| ------------ | ----------------- | ---- |
| Claude       | claude.ai         | ✅   |
| ChatGPT      | chatgpt.com       | ✅   |
| ChatGPT (구) | chat.openai.com   | ✅   |
| Gemini       | gemini.google.com | ✅   |

---

## 📁 프로젝트 구조

```
i-look/
├── extension/
│   ├── manifest.json          # 확장 프로그램 설정 및 권한 정의
│   ├── background.js          # 백그라운드 서비스 워커
│   ├── content/               # 웹 페이지 주입 스크립트 모음
│   │   ├── content.js         # 메인 콘텐츠 스크립트 진입점
│   │   ├── platformDetector.js # AI 플랫폼(Claude, GPT 등) 감지
│   │   ├── storageManager.js  # 테마 설정 저장소 관리
│   │   ├── styleInjector.js   # CSS 주입 및 스타일 변경 처리
│   │   ├── themeApplier.js    # 테마 적용 로직
│   │   └── themes.js          # 프리셋 테마 데이터
│   ├── popup/                 # 확장 프로그램 팝업 UI
│   │   ├── popup.html         # 팝업 HTML 구조
│   │   ├── popup.css          # 팝업 스타일
│   │   ├── popup.js           # 팝업 메인 로직
│   │   ├── uiController.js    # UI 이벤트 및 상태 관리
│   │   ├── themeRenderer.js   # 테마 목록 렌더링
│   │   ├── customThemeManager.js # 사용자 커스텀 테마 관리
│   │   ├── colorUtils.js      # 색상 처리 유틸리티
│   │   └── domManager.js      # DOM 조작 헬퍼
│   ├── styles/
│   │   └── injected.css       # 웹 페이지에 주입되는 기본 CSS
│   └── icons/                 # 아이콘 리소스
├── LICENSE                    # 라이선스 (MIT)
├── COPYRIGHT                  # 저작권 고지
├── NOTICE                     # 고지 사항
└── README.md                  # 프로젝트 문서
```

---

## 💻 개발자 가이드 (Developer Guide)

### 프로젝트 코드 목적 및 아키텍처

이 프로젝트는 Chrome Extension API를 활용하여 특정 AI 웹사이트의 스타일을 실시간으로 조작하는 것을 목적으로 합니다. 코드는 크게 **Content Script**, **Popup**, **Background** 세 부분으로 나뉩니다.

#### 1. Content Script (`extension/content/`)

웹 페이지에 직접 주입되어 실행되는 스크립트입니다.

- **platformDetector.js**: 현재 접속한 URL을 분석하여 어떤 AI 서비스(Claude, ChatGPT, Gemini 등)인지 식별하고 해당 플랫폼의 DOM 선택자를 반환합니다.
- **themeApplier.js**: 선택된 테마 색상 정보를 바탕으로 CSS 변수(Custom Properties)를 생성하여 페이지에 적용합니다.
- **styleInjector.js**: 스타일 변경을 위한 `<style>` 태그를 관리하고 DOM 변화를 감지하여 동적 요소에도 스타일을 유지합니다.

#### 2. Popup (`extension/popup/`)

사용자가 확장 프로그램 아이콘을 클릭했을 때 나타나는 UI입니다.

- **uiController.js**: 탭 전환, 버튼 클릭 등 사용자의 인터랙션을 처리합니다.
- **customThemeManager.js**: 사용자가 직접 만든 색상 조합을 저장하고 불러오거나 수정하는 로직을 담당합니다.
- **themeRenderer.js**: 프리셋 테마와 커스텀 테마 목록을 화면에 그립니다.

#### 3. Data Flow

1. 사용자가 Popup에서 테마를 선택합니다.
2. `storageManager.js`를 통해 Chrome Storage에 설정이 저장됩니다.
3. Content Script가 Storage 변경을 감지하거나 페이지 로드 시 설정을 읽어옵니다.
4. `themeApplier.js`가 `platformDetector.js`의 정보를 이용해 적절한 DOM 요소에 스타일을 입힙니다.

---

## 🐛 문제 해결

### Q: 테마가 적용되지 않아요

**A:**

```
1. 페이지 새로고침 (F5)
2. 확장 프로그램 새로고침
   chrome://extensions/ → 🔄 클릭
3. Chrome 재시작
```

### Q: 팝업이 안 열려요

**A:**

```
1. AI 사이트에 있는지 확인
   (claude.ai, chatgpt.com 등)
2. 확장 프로그램 활성화 확인
3. 툴바에 아이콘 고정
```

### Q: 일부만 색이 바뀌어요

**A:**

```
AI 사이트가 자주 업데이트되어
일부 요소는 적용 안 될 수 있습니다.
계속 개선 중입니다! 🔧
```

---

## 💡 팁

### 시간대별 테마 추천

```
🌅 아침 (06:00-12:00): Hoth, Solarized Light
☀️ 낮 (12:00-18:00): Ochin, Material
🌆 저녁 (18:00-22:00): Nord, Gruvbox
🌙 밤 (22:00-06:00): Aubergine, Dracula, Tokyo Night
```

### 작업별 테마 추천

```
💻 코딩: Solarized Dark, One Dark, Monokai
✍️ 글쓰기: Ochin, Hoth, Everforest
🔍 검색/리서치: Material, Nord, GitHub Dark
🎨 창작: Synthwave, Catppuccin, Rosé Pine
```

---

## 🎯 로드맵

### Phase 1 (완료!) ✅

- [x] 24개 Slack 스타일 테마
- [x] 커스텀 테마 만들기
- [x] 자동 저장/로드
- [x] 페이지네이션

### Phase 2 (계획 중)

- [ ] 테마 가져오기/내보내기
- [ ] 테마 공유 커뮤니티
- [ ] 더 많은 AI 사이트 지원
- [ ] 시간대별 자동 전환
- [ ] 테마 편집 기능

### Phase 3 (미래)

- [ ] Chrome 웹 스토어 출시
- [ ] Firefox/Safari 지원
- [ ] 실시간 협업 테마
- [ ] AI 추천 테마

---

## 📜 라이선스

이 프로젝트는 [MIT License](LICENSE)에 따라 배포됩니다.
자세한 내용은 `LICENSE`, `COPYRIGHT`, `NOTICE` 파일을 참고하세요.

---

## 💬 피드백

문제나 제안사항이 있으시면:

- GitHub Issues
- 이메일
- 또는 직접 연락주세요!

---

**Made with ❤️ for AI lovers**

👁️ **I Look** - AI를 내 스타일로!
