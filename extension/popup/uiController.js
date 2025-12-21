/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * UI Controller (UI 제어기)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - Popup UI의 탭, 모달, 폼 등을 제어합니다.
 * - 사용자 인터랙션에 따른 UI 상태를 관리합니다.
 *
 * 【주요 기능】
 * 1. switchTab(): 탭 전환 (프리셋 테마 ↔ 내 테마)
 * 2. openCustomModal(): 커스텀 테마 생성 모달 열기
 * 3. closeCustomModal(): 모달 닫기
 * 4. resetCustomForm(): 폼 초기화
 *
 * 【사용 예시】
 * ```javascript
 * // 탭 전환
 * switchTab('custom');
 *
 * // 모달 열기
 * openCustomModal();
 *
 * // 모달 닫기
 * closeCustomModal();
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * 탭을 전환합니다 (프리셋 테마 ↔ 내 테마).
 *
 * @param {string} tabName - 전환할 탭 이름 ("preset" 또는 "custom")
 */
function switchTab(tabName) {
  const { elements } = window.domManager;

  // 모든 탭에서 active 클래스 제거 후, 선택된 탭에만 추가
  elements.tabs.forEach((tab) => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // 모든 탭 콘텐츠에서 active 클래스 제거 후, 선택된 콘텐츠에만 추가
  elements.tabContents.forEach((content) => {
    if (content.id === `${tabName}-content`) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });

  console.log(`🔀 탭 전환: ${tabName}`);
}

/**
 * 커스텀 테마 생성/수정 모달을 엽니다.
 */
function openCustomModal() {
  const { elements } = window.domManager;
  elements.customModal.classList.add("active");
  resetCustomForm();
  console.log("🎨 커스텀 테마 모달 열림");
}

/**
 * 커스텀 테마 모달을 닫습니다.
 */
function closeCustomModal() {
  const { elements } = window.domManager;
  elements.customModal.classList.remove("active");

  // 수정 모드 초기화
  window.editingThemeIndex = undefined;

  // 저장 버튼 텍스트 원래대로
  elements.saveCustomBtn.textContent = "저장";

  // 모달 제목 원래대로
  const modalTitle = document.querySelector(".modal-title");
  if (modalTitle) {
    modalTitle.textContent = "테마 커스터마이징";
  }

  console.log("❌ 커스텀 테마 모달 닫힘");
}

/**
 * 커스텀 테마 폼을 기본값으로 초기화합니다.
 */
function resetCustomForm() {
  const { elements } = window.domManager;

  // 기본값 설정
  elements.themeName.value = "내 테마";
  elements.colorChatBg.value = "#FFFFFF";
  elements.hexChatBg.value = "#FFFFFF";
  elements.colorChatText.value = "#1D1C1D";
  elements.hexChatText.value = "#1D1C1D";
  elements.colorSidebar.value = "#F8F8F8";
  elements.hexSidebar.value = "#F8F8F8";
  elements.colorHeader.value = "#FFFFFF";
  elements.hexHeader.value = "#FFFFFF";
  elements.colorInputBg.value = "#FFFFFF";
  elements.hexInputBg.value = "#FFFFFF";
  elements.colorAccent.value = "#1164A3";
  elements.hexAccent.value = "#1164A3";

  // 미리보기 업데이트
  if (window.colorUtils) {
    window.colorUtils.updatePreview();
  }

  console.log("🔄 폼 초기화 완료");
}

/**
 * 테마 수정 모드를 위해 폼에 기존 값을 설정합니다.
 *
 * @param {Object} theme - 수정할 테마
 * @param {number} index - 수정할 테마의 인덱스
 */
function openEditModal(theme, index) {
  const { elements } = window.domManager;

  // 폼에 기존 값 설정
  elements.themeName.value = theme.name;
  elements.colorChatBg.value = theme.colors.chatBg;
  elements.hexChatBg.value = theme.colors.chatBg;
  elements.colorChatText.value = theme.colors.chatText;
  elements.hexChatText.value = theme.colors.chatText;
  elements.colorSidebar.value = theme.colors.sidebar;
  elements.hexSidebar.value = theme.colors.sidebar;
  elements.colorHeader.value = theme.colors.header;
  elements.hexHeader.value = theme.colors.header;
  elements.colorInputBg.value = theme.colors.inputBg;
  elements.hexInputBg.value = theme.colors.inputBg;
  elements.colorAccent.value = theme.colors.accent;
  elements.hexAccent.value = theme.colors.accent;

  // 미리보기 업데이트
  if (window.colorUtils) {
    window.colorUtils.updatePreview();
  }

  // 모달 제목 변경
  const modalTitle = document.querySelector(".modal-title");
  if (modalTitle) {
    modalTitle.textContent = "테마 수정";
  }

  // 저장 버튼 텍스트 변경
  elements.saveCustomBtn.textContent = "수정 저장";

  // 전역 변수에 수정 인덱스 저장
  window.editingThemeIndex = index;

  // 모달 열기
  elements.customModal.classList.add("active");

  console.log(`✏️ 테마 수정 모드: ${theme.name}`);
}

// 다른 파일에서 사용할 수 있도록 export
window.uiController = {
  switchTab,
  openCustomModal,
  closeCustomModal,
  resetCustomForm,
  openEditModal,
};
