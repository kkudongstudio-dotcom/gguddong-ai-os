import { AI_SECRETARY_API_URL } from "../config/aiOsApi";

/**
 * ============================================================
 * GGUDDONG AI OS
 * AI SECRETARY SERVICE
 *
 * 역할
 * - React AI OS에서 AI SECRETARY GAS Web API 호출
 * - 작업지시서 전송
 * - HTTP 응답 검증
 * - SECRETARY 처리 결과 표준화
 * - 기존 sendCommandToSecretary 함수 호환 유지
 * ============================================================
 */

const DEFAULT_REQUESTED_BY = "CEO";

/**
 * 문자열 데이터를 안전하게 정리한다.
 *
 * @param {unknown} value
 * @returns {string}
 */
function normalizeText(value) {
  return String(value ?? "").trim();
}

/**
 * AI SECRETARY API URL 설정을 검증한다.
 *
 * @returns {string}
 */
function getSecretaryApiUrl() {
  const apiUrl = normalizeText(AI_SECRETARY_API_URL);

  if (!apiUrl) {
    throw new Error("AI SECRETARY API URL이 설정되지 않았습니다.");
  }

  return apiUrl;
}

/**
 * 응답 본문을 JSON으로 변환한다.
 *
 * @param {Response} response
 * @returns {Promise<object>}
 */
async function parseSecretaryResponse(response) {
  const responseText = await response.text();

  if (!responseText) {
    throw new Error("AI SECRETARY 응답 내용이 없습니다.");
  }

  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error("AI SECRETARY JSON 변환 실패:", responseText);
    throw new Error("AI SECRETARY 응답 형식이 올바르지 않습니다.");
  }
}

/**
 * AI SECRETARY 응답 데이터를 React에서 사용하기 좋은 형태로 정리한다.
 *
 * @param {object} result
 * @param {string} requestedBy
 * @returns {object}
 */
function normalizeSecretaryResult(result, requestedBy) {
  return {
    success: Boolean(result?.success),
    taskId: result?.taskId || "",
    status: result?.status || "UNKNOWN",
    targetCenter: result?.targetCenter || "",
    responseStatus: result?.responseStatus || "",
    requestedBy: result?.requestedBy || requestedBy,
    result: result?.result ?? null,
    message:
      result?.message ||
      (result?.success
        ? "AI SECRETARY 업무 처리가 완료되었습니다."
        : "AI SECRETARY 업무 처리에 실패했습니다."),
    raw: result,
  };
}

/**
 * 작업지시서를 AI SECRETARY로 전송한다.
 *
 * @param {string} taskText
 * @param {string} requestedBy
 * @returns {Promise<object>}
 */
export async function sendTaskToSecretary(
  taskText,
  requestedBy = DEFAULT_REQUESTED_BY
) {
  const normalizedTaskText = normalizeText(taskText);
  const normalizedRequestedBy =
    normalizeText(requestedBy) || DEFAULT_REQUESTED_BY;

  if (!normalizedTaskText) {
    throw new Error("작업지시서 내용을 입력해 주세요.");
  }

  const apiUrl = getSecretaryApiUrl();

  try {
    const response = await fetch(apiUrl, {
      method: "POST",

      /*
       * GAS Web App의 불필요한 CORS 사전 요청을 줄이기 위해
       * text/plain으로 JSON 문자열을 전송한다.
       *
       * GAS doPost(e)에서는 e.postData.contents를 JSON.parse하여 사용한다.
       */
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },

      body: JSON.stringify({
        requestedBy: normalizedRequestedBy,
        taskText: normalizedTaskText,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `AI SECRETARY 통신 실패: HTTP ${response.status}`
      );
    }

    const result = await parseSecretaryResponse(response);
    const normalizedResult = normalizeSecretaryResult(
      result,
      normalizedRequestedBy
    );

    console.log("AI SECRETARY RESPONSE", normalizedResult);

    if (!normalizedResult.success) {
      throw new Error(normalizedResult.message);
    }

    return normalizedResult;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "AI SECRETARY 통신 중 알 수 없는 오류가 발생했습니다.";

    console.error("AI SECRETARY ERROR", error);

    return {
      success: false,
      taskId: "",
      status: "ERROR",
      targetCenter: "",
      responseStatus: "ERROR",
      requestedBy: normalizedRequestedBy,
      result: null,
      message,
      raw: null,
    };
  }
}

/**
 * 기존 코드 호환용 함수
 *
 * 기존에 sendCommandToSecretary를 import하는 파일을 깨지 않도록 유지한다.
 *
 * @param {string} taskText
 * @param {string} requestedBy
 * @returns {Promise<object>}
 */
export async function sendCommandToSecretary(
  taskText,
  requestedBy = DEFAULT_REQUESTED_BY
) {
  return sendTaskToSecretary(taskText, requestedBy);
}