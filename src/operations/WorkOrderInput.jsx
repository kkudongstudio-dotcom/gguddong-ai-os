import { useState } from "react";

function WorkOrderInput({
  onSubmit,
  isSubmitting = false,
}) {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    setContent(event.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  async function handleSubmit() {
    const normalizedContent = content.trim();

    if (isSubmitting) {
      return;
    }

    if (!normalizedContent) {
      setErrorMessage("작업지시서를 입력해 주세요.");
      return;
    }

    try {
      const result = await onSubmit(normalizedContent);

      if (result === false) {
        return;
      }

      setContent("");
      setErrorMessage("");
    } catch (error) {
      console.error("작업지시서 전송 실패:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "작업지시서 전송 중 오류가 발생했습니다."
      );
    }
  }

  function handleKeyDown(event) {
    if (
      event.ctrlKey &&
      event.key === "Enter" &&
      !isSubmitting
    ) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <section className="work-order-input">
      <div className="work-order-input-header">
        <div>
          <span>WORK ORDER</span>
          <h3>작업지시서 등록</h3>
        </div>

        <strong>
          {isSubmitting ? "접수 중" : "입력 대기"}
        </strong>
      </div>

      <p>
        ChatGPT가 작성한 작업지시서를 그대로 붙여넣어
        AI SECRETARY에게 전달합니다.
      </p>

      <textarea
        rows={10}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="작업지시서를 붙여넣으세요..."
        disabled={isSubmitting}
        aria-label="작업지시서 내용"
      />

      <div className="work-order-input-footer">
        <div className="work-order-input-guide">
          <span>
            {content.trim().length.toLocaleString()}자
          </span>
          <small>Ctrl + Enter로 접수</small>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "AI SECRETARY 접수 중..."
            : "작업 접수"}
        </button>
      </div>

      {errorMessage && (
        <p className="work-order-input-error">
          {errorMessage}
        </p>
      )}
    </section>
  );
}

export default WorkOrderInput;