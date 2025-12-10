/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Theme Renderer (테마 렌더러)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 프리셋 테마 목록을 화면에 렌더링합니다.
 * - 테마 카드를 동적으로 생성합니다.
 * - 페이지네이션을 처리합니다.
 * - 현재 선택된 테마를 표시합니다.
 *
 * 【주요 기능】
 * 1. renderThemes(): 현재 페이지의 테마 카드들을 렌더링
 * 2. createThemeCard(): 개별 테마 카드 생성
 * 3. updateCurrentThemeDisplay(): 현재 테마 이름 표시
 *
 * 【의존성】
 * - SLACK_THEMES: themes.js에서 정의된 프리셋 테마 배열
 * - domManager: DOM 요소 접근
 *
 * 【사용 예시】
 * ```javascript
 * // 1페이지 렌더링
 * renderThemes(1, currentTheme);
 *
 * // 현재 테마 표시
 * updateCurrentThemeDisplay(theme);
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const THEMES_PER_PAGE = 6; // 한 페이지당 표시할 테마 수

/**
 * 프리셋 테마 목록을 페이지네이션과 함께 렌더링합니다.
 *
 * @param {number} currentPage - 현재 페이지 번호 (1부터 시작)
 * @param {Object} currentTheme - 현재 선택된 테마
 * @param {Function} onThemeClick - 테마 클릭 시 호출될 콜백 함수
 */
function renderThemes(currentPage, currentTheme, onThemeClick) {
  const { elements } = window.domManager;

  // SLACK_THEMES가 로드되지 않았으면 에러
  if (typeof SLACK_THEMES === "undefined") {
    console.error("❌ SLACK_THEMES가 로드되지 않았습니다.");
    return;
  }

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(SLACK_THEMES.length / THEMES_PER_PAGE);
  elements.totalPagesSpan.textContent = totalPages;

  // 현재 페이지에 표시할 테마들 계산
  const startIndex = (currentPage - 1) * THEMES_PER_PAGE;
  const endIndex = startIndex + THEMES_PER_PAGE;
  const themesToShow = SLACK_THEMES.slice(startIndex, endIndex);

  // 테마 그리드 초기화
  elements.themesGrid.innerHTML = "";

  // 각 테마 카드 생성 및 추가
  themesToShow.forEach((theme) => {
    const isActive = currentTheme && currentTheme.id === theme.id;
    const card = createThemeCard(theme, isActive, onThemeClick);
    elements.themesGrid.appendChild(card);
  });

  // 페이지네이션 버튼 상태 업데이트
  elements.prevPageBtn.disabled = currentPage === 1;
  elements.nextPageBtn.disabled = currentPage === totalPages;
  elements.currentPageSpan.textContent = currentPage;

  console.log(`📄 페이지 ${currentPage}/${totalPages} 렌더링 완료`);
}

/**
 * 개별 테마 카드 DOM 요소를 생성합니다.
 *
 * @param {Object} theme - 테마 객체
 * @param {boolean} isActive - 현재 활성화된 테마인지 여부
 * @param {Function} onThemeClick - 클릭 시 호출될 콜백 함수
 * @returns {HTMLElement} 생성된 테마 카드 DOM 요소
 */
function createThemeCard(theme, isActive, onThemeClick) {
  const card = document.createElement("div");
  card.className = "theme-card";

  // 현재 활성화된 테마에 active 클래스 추가
  if (isActive) {
    card.classList.add("active");
  }

  // 테마 미리보기 (사이드바/채팅 배경) + 이름 + 설명
  card.innerHTML = `
    <div class="theme-preview">
      <div class="theme-preview-bar" style="background: ${theme.colors.sidebar}"></div>
      <div class="theme-preview-bar" style="background: ${theme.colors.chatBg}"></div>
    </div>
    <div class="theme-name">${theme.name}</div>
    <div class="theme-desc">${theme.description}</div>
  `;

  // 클릭 이벤트 리스너
  card.addEventListener("click", () => {
    if (onThemeClick) {
      onThemeClick(theme);
    }
  });

  return card;
}

/**
 * 현재 선택된 테마의 이름을 화면에 표시합니다.
 *
 * @param {Object|null} theme - 현재 테마 (없으면 null)
 */
function updateCurrentThemeDisplay(theme) {
  const { elements } = window.domManager;

  if (theme) {
    elements.currentThemeName.textContent = theme.name;
  } else {
    elements.currentThemeName.textContent = "없음";
  }
}

// 다른 파일에서 사용할 수 있도록 export
window.themeRenderer = {
  renderThemes,
  createThemeCard,
  updateCurrentThemeDisplay,
  THEMES_PER_PAGE,
};
