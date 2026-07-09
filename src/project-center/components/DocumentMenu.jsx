export default function DocumentMenu({
  documents,
  selectedDocument,
  onSelectDocument
}) {
  return (
    <aside className="project-document-menu">
      {documents.map((document) => (
        <button
          key={document.id}
          type="button"
          className={`project-document-menu-item ${
            document.id === selectedDocument.id ? "active" : ""
          }`}
          onClick={() => onSelectDocument(document)}
        >
          <span>{document.icon}</span>
          <strong>{document.label}</strong>
        </button>
      ))}
    </aside>
  );
}