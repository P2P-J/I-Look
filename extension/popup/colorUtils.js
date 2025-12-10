/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Color Utils (색상 유틸리티)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 【역할】
 * - 색상 관련 유틸리티 함수들을 제공합니다.
 * - 색상 피커와 Hex 입력을 동기화합니다.
 * - 미리보기 업데이트를 처리합니다.
 * - 배경색에 따라 적절한 글씨색을 계산합니다.
 *
 * 【주요 기능】
 * 1. getContrastColor(): 배경색에 맞는 대비색 계산 (WCAG 표준)
 * 2. setupColorPickers(): 색상 피커와 Hex 입력 동기화 설정
 * 3. updatePreview(): 미리보기 박스 실시간 업데이트
 *
 * 【사용 예시】
 * ```javascript
 * // 대비색 계산
 * const textColor = getContrastColor('#1A1A1A', '#FFFFFF');
 *
 * // 색상 피커 동기화 설정
 * setupColorPickers();
 *
 * // 미리보기 업데이트
 * updatePreview();
 * ```
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * 배경색에 맞춰 적절한 대비를 가진 글씨색을 자동으로 선택합니다.
 * WCAG 표준의 밝기 계산식을 사용합니다.
 *
 * @param {string} bgColor - 배경색 (16진수, 예: "#1A1A1A")
 * @param {string} userTextColor - 사용자가 선택한 글씨색 (참고용)
 * @returns {string} 적절한 대비를 가진 글씨색 (검은색 또는 흰색)
 */
function getContrastColor(bgColor, userTextColor) {
  // 16진수 색상을 RGB로 변환
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 밝기 계산 (WCAG 표준)
  // 공식: (R * 299 + G * 587 + B * 114) / 1000
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 밝기 128 이상이면 검은 글씨, 미만이면 흰 글씨
  if (brightness > 128) {
    return "#1D1C1D"; // 어두운 글씨 (밝은 배경)
  } else {
    return "#FFFFFF"; // 밝은 글씨 (어두운 배경)
  }
}

/**
 * 색상 피커(input type="color")와 Hex 입력 필드를 동기화합니다.
 * 한쪽을 변경하면 다른 쪽도 자동으로 업데이트됩니다.
 */
function setupColorPickers() {
  const { elements } = window.domManager;

  // [색상 피커 ID, Hex 입력 ID] 쌍
  const colorPairs = [
    [elements.colorChatBg, elements.hexChatBg],
    [elements.colorChatText, elements.hexChatText],
    [elements.colorSidebar, elements.hexSidebar],
    [elements.colorHeader, elements.hexHeader],
    [elements.colorInputBg, elements.hexInputBg],
    [elements.colorAccent, elements.hexAccent],
  ];

  colorPairs.forEach(([colorInput, hexInput]) => {
    if (!colorInput || !hexInput) return;

    // 색상 피커 변경 → Hex 입력 업데이트
    colorInput.addEventListener("input", (e) => {
      hexInput.value = e.target.value.toUpperCase();
      updatePreview();
    });

    // Hex 입력 변경 → 색상 피커 업데이트
    hexInput.addEventListener("input", (e) => {
      let value = e.target.value;

      // # 자동 추가
      if (!value.startsWith("#")) {
        value = "#" + value;
      }

      // 유효한 Hex 색상인지 확인
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        colorInput.value = value;
        updatePreview();
      }
    });
  });

  console.log("✅ 색상 피커 동기화 설정 완료");
}

/**
 * 커스텀 테마 모달의 미리보기 박스를 실시간으로 업데이트합니다.
 */
function updatePreview() {
  const { elements } = window.domManager;

  if (!elements.previewBox) return;

  const previewMessage = elements.previewBox.querySelector(".preview-message");
  const previewInput = elements.previewBox.querySelector(".preview-input");

  // 현재 선택된 색상 가져오기
  const chatBg = elements.colorChatBg.value;
  const chatText = elements.colorChatText.value;
  const inputBg = elements.colorInputBg.value;
  const accent = elements.colorAccent.value;
  const font = elements.fontSelect.value;

  // 미리보기 박스 스타일 적용
  elements.previewBox.style.background = chatBg;
  elements.previewBox.style.color = chatText;

  if (font !== "system") {
    elements.previewBox.style.fontFamily = font;
  } else {
    elements.previewBox.style.fontFamily = "";
  }

  // 메시지 스타일
  if (previewMessage) {
    previewMessage.style.background = accent;
    previewMessage.style.color = "#FFFFFF";
  }

  // 입력창 스타일
  if (previewInput) {
    previewInput.style.background = inputBg;
    previewInput.style.color = chatText;
  }
}

/**
 * 미리보기 실시간 업데이트를 위한 이벤트 리스너를 설정합니다.
 */
function setupPreviewListeners() {
  const { elements } = window.domManager;

  const inputs = [
    elements.colorChatBg,
    elements.colorChatText,
    elements.colorSidebar,
    elements.colorHeader,
    elements.colorInputBg,
    elements.colorAccent,
    elements.fontSelect,
  ];

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener("change", updatePreview);
      input.addEventListener("input", updatePreview);
    }
  });

  console.log("✅ 미리보기 리스너 설정 완료");
}

// 다른 파일에서 사용할 수 있도록 export
window.colorUtils = {
  getContrastColor,
  setupColorPickers,
  updatePreview,
  setupPreviewListeners,
};
