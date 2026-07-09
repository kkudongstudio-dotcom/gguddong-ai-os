export default function DocumentViewer({ document }) {
  return (
    <section className="project-document-viewer">
      <div className="document-badge-row">
        <span>{document.label}</span>
        <strong>{document.status}</strong>
      </div>

      <h3>{document.title}</h3>

      <div className="document-meta-grid">
        <div>
          <span>문서번호</span>
          <strong>{document.docId}</strong>
        </div>

        <div>
          <span>작성일</span>
          <strong>{document.date}</strong>
        </div>

        <div>
          <span>버전</span>
          <strong>{document.version}</strong>
        </div>
      </div>

      <div className="document-body">
        {document.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}