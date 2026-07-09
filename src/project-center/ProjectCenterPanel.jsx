import { useState } from "react";

import "./project-center.css";

const documents = [
  {
    id: "work-order",
    icon: "📋",
    label: "작업지시서",
    title: "ERP(AI OS) Project Document Center 구축",
    docId: "ERP-WO-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "진행중",
    body: [
      "Recovery Sprint의 첫 번째 핵심 작업.",
      "ERP(AI OS)를 GGUDDONG 프로젝트의 공식 문서 관리 본부로 구축한다.",
      "작업지시서, 작업보고, 체크리스트, 완료선언, 프로젝트 현황을 하나의 흐름으로 연결한다."
    ]
  },
  {
    id: "work-report",
    icon: "📝",
    label: "작업보고",
    title: "AI OS 개발 기반 복구 보고",
    docId: "ERP-WR-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "작성 예정",
    body: [
      "GitHub 연결 완료.",
      "Cloudflare 자동 배포 완료.",
      "GGUDDONG_AI_OS 명칭 확정."
    ]
  },
  {
    id: "checklist",
    icon: "☑",
    label: "체크리스트",
    title: "Recovery Sprint 완료 체크리스트",
    docId: "ERP-CL-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "진행중",
    body: [
      "Project Center 구축",
      "문서 뷰어 구축",
      "문서 데이터 연결",
      "GitHub / Cloudflare 배포 확인"
    ]
  },
  {
    id: "declaration",
    icon: "🏁",
    label: "완료선언",
    title: "ERP(AI OS) Recovery Sprint 완료 선언",
    docId: "ERP-DC-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "대기",
    body: ["Project Document Center 구축 완료 후 작성한다."]
  },
  {
    id: "status",
    icon: "📊",
    label: "프로젝트 현황",
    title: "GGUDDONG AI OS 현재 상태",
    docId: "ERP-ST-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "ACTIVE",
    body: [
      "AI SECRETARY 95%",
      "CONTENT CENTER 98%",
      "AI DIRECTOR 60%",
      "AI OS 인프라 구축 완료"
    ]
  },
  {
    id: "roadmap",
    icon: "🗺",
    label: "개발 로드맵",
    title: "AI OS Recovery Roadmap",
    docId: "ERP-RM-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "ACTIVE",
    body: [
      "1단계 Project Center",
      "2단계 CEO COMMAND",
      "3단계 AI STATUS",
      "4단계 TODAY WORK",
      "5단계 TASK LOG"
    ]
  },
  {
    id: "charter",
    icon: "📖",
    label: "운영 헌장",
    title: "GGUDDONG Project 운영 헌장",
    docId: "ERP-CH-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "ACTIVE",
    body: [
      "기능보다 운영.",
      "속도보다 방향.",
      "추측보다 데이터.",
      "아이디어보다 완성.",
      "기억으로 프로젝트를 이어가지 않는다. 기록으로 프로젝트를 이어간다."
    ]
  },
  {
    id: "audit",
    icon: "🔍",
    label: "ENGINE AUDIT",
    title: "ENGINE AUDIT 기록",
    docId: "ERP-AU-20260710-001",
    date: "2026-07-10",
    version: "v1.0",
    status: "대기",
    body: ["LOTTO ENGINE V3 Stage2 완료 이후 감사 기준으로 관리한다."]
  }
];

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
        <aside className="project-document-menu">
          {documents.map((document) => (
            <button
              key={document.id}
              type="button"
              className={`project-document-menu-item ${
                document.id === selectedDocument.id ? "active" : ""
              }`}
              onClick={() => setSelectedDocument(document)}
            >
              <span>{document.icon}</span>
              <strong>{document.label}</strong>
            </button>
          ))}
        </aside>

        <section className="project-document-viewer">
          <div className="document-badge-row">
            <span>{selectedDocument.label}</span>
            <strong>{selectedDocument.status}</strong>
          </div>

          <h3>{selectedDocument.title}</h3>

          <div className="document-meta-grid">
            <div>
              <span>문서번호</span>
              <strong>{selectedDocument.docId}</strong>
            </div>

            <div>
              <span>작성일</span>
              <strong>{selectedDocument.date}</strong>
            </div>

            <div>
              <span>버전</span>
              <strong>{selectedDocument.version}</strong>
            </div>
          </div>

          <div className="document-body">
            {selectedDocument.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}