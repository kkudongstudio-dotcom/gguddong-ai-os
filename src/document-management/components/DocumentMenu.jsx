function DocumentMenu({
  documents,
  activeDocumentId,
  onSelectDocument,
}) {
  if (!documents.length) {
    return (
      <section className="document-menu">
        <div className="document-empty-state">
          <strong>검색 결과가 없습니다.</strong>
          <p>다른 검색어나 문서 분류를 선택해 주세요.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="document-menu">
      <div className="document-menu-header">
        <strong>문서 목록</strong>
        <span>{documents.length}개</span>
      </div>

      <div className="document-menu-list">
        {documents.map((document) => {
          const isActive =
            document.id === activeDocumentId;

          return (
            <button
              key={document.id}
              type="button"
              className={`document-menu-item ${
                isActive ? "active" : ""
              }`}
              onClick={() =>
                onSelectDocument(document.id)
              }
            >
              <span className="document-file-icon">📄</span>

              <span className="document-file-text">
                <strong>{document.title}</strong>

                <small>
                  {document.author} · {document.updatedAt}
                </small>
              </span>

              <span className="document-list-status">
                {document.status}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default DocumentMenu;