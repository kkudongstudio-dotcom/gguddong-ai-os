import { useState } from "react";

function WorkOrderInput({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("작업지시서를 입력해주세요.");
      return;
    }

    onSubmit(content);
    alert("작업지시서가 접수되었습니다.");
    setContent("");
  };

  return (
    <div className="work-order-input">
      <h3>작업지시서 등록</h3>

      <p>ChatGPT가 작성한 작업지시서를 그대로 붙여넣어 접수합니다.</p>

      <textarea
        rows={10}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="작업지시서를 붙여넣으세요..."
      />

      <button type="button" onClick={handleSubmit}>
        작업 접수
      </button>
    </div>
  );
}

export default WorkOrderInput;