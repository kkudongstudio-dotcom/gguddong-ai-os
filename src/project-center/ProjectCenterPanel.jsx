import { useState } from "react";

import { documents } from "./data/documents";
import DocumentMenu from "./components/DocumentMenu";
import DocumentViewer from "./components/DocumentViewer";

import "./project-center.css";

export default function ProjectCenterPanel() {
  const [selectedDocument, setSelectedDocument] = useState(documents[0]);

  return (
    <div className="project-center">
      <header className="project-center-header">
        <span>GGUDDONG AI OS</span>
        <h2>프로젝트 센터</h2>
        <p>공식 문서 관리 본부</p>
      </header>

      <div className="project-center-layout">
        <DocumentMenu
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
        />

        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  );
}