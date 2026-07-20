import { useState } from "react";

const documentCategories = [
  "운영정책",
  "업무보고",
  "AI 보고서",
  "사업부 문서",
  "회의록",
  "매뉴얼",
  "공지사항",
  "보관문서",
  "기타",
];

const documentAuthors = [
  "대표",
  "AI SECRETARY",
  "AI DIRECTOR",
  "CONTENT MASTER",
  "NOTICE MASTER",
];

function NewDocumentModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "업무보고",
    author: "대표",
    status: "검토중",
    content: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = formData.title.trim();
    const content = formData.content.trim();

    if (!title) {
      setErrorMessage("문서 제목을 입력해 주세요.");
      return;
    }

    if (!content) {
      setErrorMessage("문서 내용을 입력해 주세요.");
      return;
    }

    onSave({
      ...formData,
      title,
      content,
    });
  }

  return (
    <div
      className="new-document-overlay"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="new-document-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-document-title"
      >
        <header className="new-document-modal-header">
          <div>
            <p>DOCUMENT EDITOR</p>
            <h3 id="new-document-title">새 문서 작성</h3>
          </div>

          <button
            type="button"
            className="new-document-close"
            onClick={onClose}
            aria-label="새 문서 창 닫기"
          >
            ×
          </button>
        </header>

        <form
          className="new-document-form"
          onSubmit={handleSubmit}
        >
          <label className="new-document-field new-document-field-wide">
            <span>문서 제목</span>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="문서 제목을 입력하세요."
              autoFocus
            />
          </label>

          <div className="new-document-form-grid">
            <label className="new-document-field">
              <span>문서 분류</span>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {documentCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="new-document-field">
              <span>작성자</span>

              <select
                name="author"
                value={formData.author}
                onChange={handleChange}
              >
                {documentAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </label>

            <label className="new-document-field">
              <span>문서 상태</span>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="검토중">검토중</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
                <option value="확정">확정</option>
                <option value="보류">보류</option>
              </select>
            </label>
          </div>

          <label className="new-document-field new-document-field-content">
            <span>문서 내용</span>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="문서 내용을 입력하세요."
            />
          </label>

          {errorMessage && (
            <p className="new-document-error">
              {errorMessage}
            </p>
          )}

          <footer className="new-document-actions">
            <button
              type="button"
              className="new-document-cancel"
              onClick={onClose}
            >
              취소
            </button>

            <button
              type="submit"
              className="new-document-save"
            >
              문서 저장
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default NewDocumentModal;