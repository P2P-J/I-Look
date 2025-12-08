# 👁️ I Look

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

```
1. AI 사이트 방문 (claude.ai, chatgpt.com, gemini.google.com)
2. 툴바에서 I Look 아이콘(👁️) 클릭
3. 원하는 테마 클릭
4. 즉시 적용! ✨
```

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
└── extension/
    ├── manifest.json          # 확장 프로그램 설정
    ├── popup/
    │   ├── popup.html         # 팝업 UI
    │   ├── popup.css          # 팝업 스타일
    │   └── popup.js           # 팝업 로직
    ├── content/
    │   ├── themes.js          # 24개 테마 데이터
    │   └── content.js         # 테마 적용 로직
    ├── styles/
    │   └── injected.css       # 주입 CSS
    └── icons/
        ├── icon16.png         # 16x16 아이콘
        ├── icon48.png         # 48x48 아이콘
        └── icon128.png        # 128x128 아이콘
```

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

MIT License

---

## 💬 피드백

문제나 제안사항이 있으시면:

- GitHub Issues
- 이메일
- 또는 직접 연락주세요!

---

**Made with ❤️ for AI lovers**

👁️ **I Look** - AI를 내 스타일로!
