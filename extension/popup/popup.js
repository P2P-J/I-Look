// I Look Popup Script

// 전역 변수
let currentPage = 1;
const themesPerPage = 6;
let currentTheme = null;
let customThemes = [];

// DOM 요소
const elements = {
  themesGrid: document.getElementById("themes-grid"),
  currentPageSpan: document.getElementById("current-page"),
  totalPagesSpan: document.getElementById("total-pages"),
  prevPageBtn: document.getElementById("prev-page"),
  nextPageBtn: document.getElementById("next-page"),
  customThemesList: document.getElementById("custom-themes-list"),
  createCustomBtn: document.getElementById("create-custom-btn"),
  customModal: document.getElementById("custom-modal"),
  closeModalBtn: document.getElementById("close-modal"),
  saveCustomBtn: document.getElementById("save-custom-btn"),
  cancelBtn: document.getElementById("cancel-btn"),
  currentThemeName: document.getElementById("current-theme-name"),
  tabs: document.querySelectorAll(".tab"),
  tabContents: document.querySelectorAll(".tab-content"),
};

// SLACK_THEMES를 전역으로 가져오기 위한 스크립트 동적 로드 (맨 위로 이동)
function loadThemesScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "../content/themes.js";
    script.onload = () => {
      console.log("themes.js 로드 완료");
      resolve();
    };
    script.onerror = () => {
      console.error("themes.js 로드 실패");
      reject(new Error("themes.js 로드 실패"));
    };
    document.head.appendChild(script);
  });
}

// 초기화
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // themes.js 로드 완료 대기
    await loadThemesScript();

    // 저장된 데이터 불러오기
    await loadSavedData();

    // 프리셋 테마 렌더링
    renderThemes();

    // 커스텀 테마 렌더링
    renderCustomThemes();

    // 이벤트 리스너 설정
    setupEventListeners();

    // 현재 테마 표시
    updateCurrentThemeDisplay();
  } catch (error) {
    console.error("팝업 초기화 실패:", error);
  }
});

// 저장된 데이터 불러오기
async function loadSavedData() {
  try {
    const data = await chrome.storage.local.get([
      "currentTheme",
      "customThemes",
    ]);
    console.log("📂 저장된 데이터 로드:", data); // 디버그용

    currentTheme = data.currentTheme || null;
    customThemes = data.customThemes || [];

    console.log("✅ 로드된 커스텀 테마:", customThemes);
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
}
// 프리셋 테마 렌더링
function renderThemes() {
  const totalPages = Math.ceil(SLACK_THEMES.length / themesPerPage);
  elements.totalPagesSpan.textContent = totalPages;

  const startIndex = (currentPage - 1) * themesPerPage;
  const endIndex = startIndex + themesPerPage;
  const themesToShow = SLACK_THEMES.slice(startIndex, endIndex);

  elements.themesGrid.innerHTML = "";

  themesToShow.forEach((theme) => {
    const card = createThemeCard(theme);
    elements.themesGrid.appendChild(card);
  });

  // 페이지네이션 버튼 상태
  elements.prevPageBtn.disabled = currentPage === 1;
  elements.nextPageBtn.disabled = currentPage === totalPages;
  elements.currentPageSpan.textContent = currentPage;
}

// 테마 카드 생성
function createThemeCard(theme) {
  const card = document.createElement("div");
  card.className = "theme-card";

  if (currentTheme && currentTheme.id === theme.id) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="theme-preview">
      <div class="theme-preview-bar" style="background: ${theme.colors.sidebar}"></div>
      <div class="theme-preview-bar" style="background: ${theme.colors.chatBg}"></div>
    </div>
    <div class="theme-name">${theme.name}</div>
    <div class="theme-desc">${theme.description}</div>
  `;

  card.addEventListener("click", () => applyTheme(theme));

  return card;
}

// 테마 적용
async function applyTheme(theme) {
  try {
    currentTheme = theme;

    // 저장
    await chrome.storage.local.set({ currentTheme: theme });

    // Content Script에 메시지 전송
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab) {
      chrome.tabs
        .sendMessage(tab.id, {
          action: "applyTheme",
          theme: theme,
        })
        .catch((err) => {
          console.log("메시지 전송 실패:", err);
        });
    }

    // UI 업데이트
    renderThemes();
    renderCustomThemes();
    updateCurrentThemeDisplay();

    console.log("테마 적용:", theme.name);
  } catch (error) {
    console.error("테마 적용 실패:", error);
  }
}

// 커스텀 테마 렌더링
function renderCustomThemes() {
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

  elements.customThemesList.innerHTML = "";

  customThemes.forEach((theme, index) => {
    const card = createCustomThemeCard(theme, index);
    elements.customThemesList.appendChild(card);
  });
}

// 커스텀 테마 카드 생성
function createCustomThemeCard(theme, index) {
  const card = document.createElement("div");
  card.className = "custom-theme-card";

  if (currentTheme && currentTheme.id === theme.id) {
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

  // 테마 적용
  card.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("delete-custom-btn") &&
      !e.target.classList.contains("edit-custom-btn")
    ) {
      applyTheme(theme);
    }
  });

  // 수정 버튼
  const editBtn = card.querySelector(".edit-custom-btn");
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    editCustomTheme(index);
  });

  // 삭제 버튼
  const deleteBtn = card.querySelector(".delete-custom-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteCustomTheme(index);
  });

  return card;
}

// 커스텀 테마 삭제
async function deleteCustomTheme(index) {
  if (confirm("이 테마를 삭제하시겠습니까?")) {
    try {
      customThemes.splice(index, 1);
      await chrome.storage.local.set({ customThemes });
      renderCustomThemes();
      console.log("커스텀 테마 삭제됨");
    } catch (error) {
      console.error("테마 삭제 실패:", error);
    }
  }
}

function editCustomTheme(index) {
  const theme = customThemes[index];

  // 폼에 기존 값 설정
  document.getElementById("theme-name").value = theme.name;
  document.getElementById("color-chat-bg").value = theme.colors.chatBg;
  document.getElementById("hex-chat-bg").value = theme.colors.chatBg;
  document.getElementById("color-chat-text").value = theme.colors.chatText;
  document.getElementById("hex-chat-text").value = theme.colors.chatText;
  document.getElementById("color-sidebar").value = theme.colors.sidebar;
  document.getElementById("hex-sidebar").value = theme.colors.sidebar;
  document.getElementById("color-header").value = theme.colors.header;
  document.getElementById("hex-header").value = theme.colors.header;
  document.getElementById("color-input-bg").value = theme.colors.inputBg;
  document.getElementById("hex-input-bg").value = theme.colors.inputBg;
  document.getElementById("color-accent").value = theme.colors.accent;
  document.getElementById("hex-accent").value = theme.colors.accent;
  document.getElementById("font-select").value = theme.font || "system";

  // 미리보기 업데이트
  updatePreview();

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
}

// 현재 테마 표시 업데이트
function updateCurrentThemeDisplay() {
  if (currentTheme) {
    elements.currentThemeName.textContent = currentTheme.name;
  } else {
    elements.currentThemeName.textContent = "없음";
  }
}

// 이벤트 리스너 설정
function setupEventListeners() {
  // 페이지네이션
  elements.prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderThemes();
    }
  });

  elements.nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(SLACK_THEMES.length / themesPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderThemes();
    }
  });

  // 탭 전환
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;
      switchTab(targetTab);
    });
  });

  // 커스텀 테마 만들기 버튼
  elements.createCustomBtn.addEventListener("click", openCustomModal);

  // 모달 닫기
  elements.closeModalBtn.addEventListener("click", closeCustomModal);
  elements.cancelBtn.addEventListener("click", closeCustomModal);

  // 모달 배경 클릭 시 닫기
  elements.customModal.addEventListener("click", (e) => {
    if (e.target === elements.customModal) {
      closeCustomModal();
    }
  });

  // 커스텀 테마 저장
  elements.saveCustomBtn.addEventListener("click", saveCustomTheme);

  // 색상 피커와 Hex 입력 동기화
  setupColorPickers();

  // 미리보기 실시간 업데이트
  setupPreview();
}

// 탭 전환
function switchTab(tabName) {
  elements.tabs.forEach((tab) => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  elements.tabContents.forEach((content) => {
    if (content.id === `${tabName}-content`) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });
}

// 커스텀 모달 열기
function openCustomModal() {
  elements.customModal.classList.add("active");
  resetCustomForm();
}

// 커스텀 모달 닫기
function closeCustomModal() {
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
}

// 커스텀 폼 초기화
function resetCustomForm() {
  document.getElementById("theme-name").value = "내 테마";
  document.getElementById("color-chat-bg").value = "#FFFFFF";
  document.getElementById("hex-chat-bg").value = "#FFFFFF";
  document.getElementById("color-chat-text").value = "#1D1C1D";
  document.getElementById("hex-chat-text").value = "#1D1C1D";
  document.getElementById("color-sidebar").value = "#F8F8F8";
  document.getElementById("hex-sidebar").value = "#F8F8F8";
  document.getElementById("color-header").value = "#FFFFFF";
  document.getElementById("hex-header").value = "#FFFFFF";
  document.getElementById("color-input-bg").value = "#FFFFFF";
  document.getElementById("hex-input-bg").value = "#FFFFFF";
  document.getElementById("color-accent").value = "#1164A3";
  document.getElementById("hex-accent").value = "#1164A3";
  document.getElementById("font-select").value = "system";

  updatePreview();
}

// 색상 피커 설정
function setupColorPickers() {
  const colorPairs = [
    ["color-chat-bg", "hex-chat-bg"],
    ["color-chat-text", "hex-chat-text"],
    ["color-sidebar", "hex-sidebar"],
    ["color-header", "hex-header"],
    ["color-input-bg", "hex-input-bg"],
    ["color-accent", "hex-accent"],
  ];

  colorPairs.forEach(([colorId, hexId]) => {
    const colorInput = document.getElementById(colorId);
    const hexInput = document.getElementById(hexId);

    colorInput.addEventListener("input", (e) => {
      hexInput.value = e.target.value.toUpperCase();
      updatePreview();
    });

    hexInput.addEventListener("input", (e) => {
      let value = e.target.value;
      if (!value.startsWith("#")) {
        value = "#" + value;
      }
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        colorInput.value = value;
        updatePreview();
      }
    });
  });
}

// 미리보기 설정
function setupPreview() {
  const inputs = [
    "color-chat-bg",
    "color-chat-text",
    "color-sidebar",
    "color-header",
    "color-input-bg",
    "color-accent",
    "font-select",
  ];

  inputs.forEach((id) => {
    document.getElementById(id).addEventListener("change", updatePreview);
  });
}

// 미리보기 업데이트
function updatePreview() {
  const previewBox = document.getElementById("preview-box");
  const previewMessage = previewBox.querySelector(".preview-message");
  const previewInput = previewBox.querySelector(".preview-input");

  const chatBg = document.getElementById("color-chat-bg").value;
  const chatText = document.getElementById("color-chat-text").value;
  const inputBg = document.getElementById("color-input-bg").value;
  const accent = document.getElementById("color-accent").value;
  const font = document.getElementById("font-select").value;

  previewBox.style.background = chatBg;
  previewBox.style.color = chatText;

  if (font !== "system") {
    previewBox.style.fontFamily = font;
  }

  previewMessage.style.background = accent;
  previewMessage.style.color = "#FFFFFF";

  previewInput.style.background = inputBg;
  previewInput.style.color = chatText;
}

// 커스텀 테마 저장
async function saveCustomTheme() {
  try {
    const name =
      document.getElementById("theme-name").value.trim() || "내 테마";

    // 배경색과 글씨색의 대비 확인
    const chatBg = document.getElementById("color-chat-bg").value;
    const chatText = document.getElementById("color-chat-text").value;

    // 자동 글씨색 조정 함수
    const finalChatText = getContrastColor(chatBg, chatText);

    const customTheme = {
      id:
        window.editingThemeIndex !== undefined
          ? customThemes[window.editingThemeIndex].id
          : "custom-" + Date.now(),
      name: name,
      description: "커스텀 테마",
      isCustom: true,
      colors: {
        primary: document.getElementById("color-sidebar").value,
        sidebar: document.getElementById("color-sidebar").value,
        header: document.getElementById("color-header").value,
        chatBg: chatBg,
        chatText: finalChatText, // 🎨 자동 조정된 글씨색
        inputBg: document.getElementById("color-input-bg").value,
        inputBorder: document.getElementById("color-accent").value,
        accent: document.getElementById("color-accent").value,
      },
      font: document.getElementById("font-select").value,
    };

    // 수정 모드인지 신규 생성인지 판별
    let isEditing = false;
    if (window.editingThemeIndex !== undefined) {
      // 수정 모드: 기존 테마 업데이트
      customThemes[window.editingThemeIndex] = customTheme;
      isEditing = true;
    } else {
      // 신규 생성: 배열에 추가
      customThemes.push(customTheme);
    }

    // 💾 chrome.storage.local에 저장
    await chrome.storage.local.set({ customThemes: customThemes });

    // 바로 적용
    await applyTheme(customTheme);

    // UI 업데이트
    renderCustomThemes();
    closeCustomModal();

    // 내 테마 탭으로 전환
    switchTab("custom");

    // 🔄 수정 모드일 때만 웹브라우저 리로드
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
  } catch (error) {
    console.error("테마 저장 실패:", error);
    alert("테마 저장에 실패했습니다. 다시 시도해주세요.");
  }
}

// 🎨 배경색에 맞춰 대비 높은 글씨색 자동 선택
function getContrastColor(bgColor, userTextColor) {
  // 16진수 색상을 RGB로 변환
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 밝기 계산 (WCAG 표준)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 밝기 128 이상이면 검은 글씨, 미만이면 흰 글씨
  if (brightness > 128) {
    return "#1D1C1D"; // 어두운 글씨
  } else {
    return "#FFFFFF"; // 밝은 글씨
  }
}
