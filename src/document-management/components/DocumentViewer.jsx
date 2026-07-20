export default function DocumentViewer({ document }) {
  if (!document) {
    return (
      <main className="document-viewer">
        <p>선택된 문서가 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="document-viewer">
      <div className="document-viewer-header">
        <div>
          <span className="document-viewer-category">
            {document.category}
          </span>
          <h3>{document.title}</h3>
        </div>

        <span className="document-status">{document.status}</span>
      </div>

      <div className="document-meta">
        <span>작성자: {document.author}</span>
        <span>최근 수정: {document.updatedAt}</span>
      </div>

      <div className="document-content">
        {document.content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </main>
  );
}