/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Custom Theme Manager (커스텀 테마 관리자)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 사용자가 생성한 커스텀 테마를 관리합니다.
 * - 커스텀 테마의 생성, 수정, 삭제, 렌더링을 담당합니다.
 *
 * 【주요 기능】
 * 1. renderCustomThemes(): 커스텀 테마 목록 렌더링
 * 2. saveCustomTheme(): 커스텀 테마 저장 (생성/수정)
 * 3. deleteCustomTheme(): 커스텀 테마 삭제
 * 4. createCustomThemeCard(): 커스텀 테마 카드 생성
 *
 * 【저장 위치】
 * Chrome Storage에 customThemes 배열로 저장됩니다.
 *
 * 【사용 예시】
 * ```javascript
 * // 커스텀 테마 렌더링
 * renderCustomThemes(customThemes, currentTheme, onThemeClick);
 *
 * // 커스텀 테마 저장
 * await saveCustomTheme(applyThemeCallback);
 *
 * // 커스텀 테마 삭제
 * await deleteCustomTheme(index, renderCallback);
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * 커스텀 테마 목록을 렌더링합니다.
 *
 * @param {Array} customThemes - 커스텀 테마 배열
 * @param {Object} currentTheme - 현재 선택된 테마
 * @param {Function} onThemeClick - 테마 클릭 시 콜백
 * @param {Function} onEditClick - 수정 버튼 클릭 시 콜백
 * @param {Function} onDeleteClick - 삭제 버튼 클릭 시 콜백
 */
function renderCustomThemes(
  customThemes,
  currentTheme,
  onThemeClick,
  onEditClick,
  onDeleteClick
) {
  const { elements } = window.domManager;

  // 커스텀 테마가 없으면 안내 메시지 표시
  if (customThemes.length === 0) {
    elements.customThemesList.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🎨</span>
        <p>아직 저장된 커스텀 테마가 없습니다</p>
        <p class="empty-hint">아래 버튼으로 나만의 테마를 만들어보세요!</p>
      </div>
    `;
    return;
  }

  // 커스텀 테마 목록 초기화
  elements.customThemesList.innerHTML = "";

  // 각 커스텀 테마 카드 생성
  customThemes.forEach((theme, index) => {
    const isActive = currentTheme && currentTheme.id === theme.id;
    const card = createCustomThemeCard(
      theme,
      index,
      isActive,
      onThemeClick,
      onEditClick,
      onDeleteClick
    );
    elements.customThemesList.appendChild(card);
  });

  console.log(`🎨 커스텀 테마 ${customThemes.length}개 렌더링 완료`);
}

/**
 * 개별 커스텀 테마 카드 DOM 요소를 생성합니다.
 *
 * @param {Object} theme - 테마 객체
 * @param {number} index - 테마 인덱스
 * @param {boolean} isActive - 현재 활성화된 테마인지 여부
 * @param {Function} onThemeClick - 테마 클릭 시 콜백
 * @param {Function} onEditClick - 수정 버튼 클릭 시 콜백
 * @param {Function} onDeleteClick - 삭제 버튼 클릭 시 콜백
 * @returns {HTMLElement} 생성된 커스텀 테마 카드
 */
function createCustomThemeCard(
  theme,
  index,
  isActive,
  onThemeClick,
  onEditClick,
  onDeleteClick
) {
  const card = document.createElement("div");
  card.className = "custom-theme-card";

  if (isActive) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="custom-theme-preview">
      <div class="custom-preview-sidebar" style="background: ${theme.colors.sidebar}"></div>
      <div style="background: ${theme.colors.header}"></div>
      <div style="background: ${theme.colors.chatBg}"></div>
    </div>
    <div class="custom-theme-info">
      <div class="custom-theme-name">${theme.name}</div>
      <div class="custom-theme-colors">
        <div class="color-dot" style="background: ${theme.colors.sidebar}"></div>
        <div class="color-dot" style="background: ${theme.colors.chatBg}"></div>
        <div class="color-dot" style="background: ${theme.colors.accent}"></div>
      </div>
    </div>
    <div class="custom-theme-buttons">
      <button class="edit-custom-btn" data-index="${index}">수정</button>
      <button class="delete-custom-btn" data-index="${index}">삭제</button>
    </div>
  `;

  // 테마 적용 (카드 클릭)
  card.addEventListener("click", (e) => {
    // 버튼 클릭이 아닐 때만 테마 적용
    if (
      !e.target.classList.contains("delete-custom-btn") &&
      !e.target.classList.contains("edit-custom-btn")
    ) {
      if (onThemeClick) {
        onThemeClick(theme);
      }
    }
  });

  // 수정 버튼
  const editBtn = card.querySelector(".edit-custom-btn");
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (onEditClick) {
      onEditClick(theme, index);
    }
  });

  // 삭제 버튼
  const deleteBtn = card.querySelector(".delete-custom-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (onDeleteClick) {
      onDeleteClick(index);
    }
  });

  return card;
}

/**
 * 커스텀 테마를 저장합니다 (생성 또는 수정).
 *
 * @param {Array} customThemes - 현재 커스텀 테마 배열
 * @param {Function} applyThemeCallback - 테마 적용 콜백
 * @returns {Promise<Object>} 저장된 테마와 업데이트된 배열
 */
async function saveCustomTheme(customThemes, applyThemeCallback) {
  const { elements } = window.domManager;

  try {
    const name = elements.themeName.value.trim() || "내 테마";
    const chatBg = elements.colorChatBg.value;
    const chatText = elements.colorChatText.value;

    // 배경색에 맞는 글씨색 자동 조정
    const finalChatText = window.colorUtils
      ? window.colorUtils.getContrastColor(chatBg, chatText)
      : chatText;

    // 테마 객체 생성
    const customTheme = {
      id:
        window.editingThemeIndex !== undefined
          ? customThemes[window.editingThemeIndex].id
          : "custom-" + Date.now(),
      name: name,
      description: "커스텀 테마",
      isCustom: true,
      colors: {
        primary: elements.colorSidebar.value,
        sidebar: elements.colorSidebar.value,
        header: elements.colorHeader.value,
        chatBg: chatBg,
        chatText: finalChatText,
        inputBg: elements.colorInputBg.value,
        inputBorder: elements.colorAccent.value,
        accent: elements.colorAccent.value,
      },
    };

    // 수정 모드인지 신규 생성인지 판별
    let isEditing = false;
    let updatedThemes;

    if (window.editingThemeIndex !== undefined) {
      // 수정 모드: 기존 테마 업데이트
      updatedThemes = [...customThemes];
      updatedThemes[window.editingThemeIndex] = customTheme;
      isEditing = true;
      console.log("✏️ 테마 수정:", customTheme.name);
    } else {
      // 신규 생성: 배열에 추가
      updatedThemes = [...customThemes, customTheme];
      console.log("➕ 새 테마 생성:", customTheme.name);
    }

    // Chrome Storage에 저장
    await chrome.storage.local.set({ customThemes: updatedThemes });

    // 테마 적용
    if (applyThemeCallback) {
      await applyThemeCallback(customTheme);
    }

    // 수정 모드일 때만 페이지 새로고침
    if (isEditing) {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab) {
        chrome.tabs
          .sendMessage(tab.id, {
            action: "applyTheme",
            theme: customTheme,
          })
          .catch((err) => {
            console.log("메시지 전송 실패:", err);
          });

        setTimeout(() => {
          chrome.tabs.reload(tab.id);
        }, 500);
      }
    }

    return { theme: customTheme, themes: updatedThemes };
  } catch (error) {
    console.error("❌ 테마 저장 실패:", error);
    alert("테마 저장에 실패했습니다. 다시 시도해주세요.");
    throw error;
  }
}

/**
 * 커스텀 테마를 삭제합니다.
 *
 * @param {number} index - 삭제할 테마의 인덱스
 * @param {Array} customThemes - 현재 커스텀 테마 배열
 * @returns {Promise<Array>} 업데이트된 커스텀 테마 배열
 */
async function deleteCustomTheme(index, customThemes) {
  if (!confirm("이 테마를 삭제하시겠습니까?")) {
    return customThemes;
  }

  try {
    const updatedThemes = [...customThemes];
    const deletedTheme = updatedThemes.splice(index, 1)[0];

    await chrome.storage.local.set({ customThemes: updatedThemes });

    console.log("🗑️ 테마 삭제:", deletedTheme.name);
    return updatedThemes;
  } catch (error) {
    console.error("❌ 테마 삭제 실패:", error);
    alert("테마 삭제에 실패했습니다.");
    throw error;
  }
}

// 다른 파일에서 사용할 수 있도록 export
window.customThemeManager = {
  renderCustomThemes,
  createCustomThemeCard,
  saveCustomTheme,
  deleteCustomTheme,
};
