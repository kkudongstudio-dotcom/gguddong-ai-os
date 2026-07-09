import { useMemo, useState } from "react";

import "../styles/pages/projects.css";

const initialProjects = [
  {
    id: "erp-ai-os",
    name: "GGUDDONG ERP(AI OS)",
    type: "HQ SYSTEM",
    status: "FOUNDATION SPRINT",
    progress: 48,
    currentSprint: "Project Document Center 2차 구축",
    lastWorkOrder: "ERP(AI OS) Project Document Center 구축",
    lastWorkReport: "LOTTO ENGINE V3 Stage2 완료 후 ERP Recovery 재개 준비",
    nextSprint: "Project Document Center 3차 구축",
    memo: "모든 GGUDDONG 프로젝트 문서를 통합 관리하는 본사 운영 시스템입니다.",
    documents: [
      {
        id: "ERP-WO-20260710-001",
        type: "Work Order",
        title: "ERP(AI OS) Project Document Center 구축",
        version: "v1.0",
        date: "2026-07-10",
        status: "ACTIVE",
        summary:
          "작업지시서, 완료보고, 완료선언, AUDIT, Project Status를 프로젝트 단위로 관리하기 위한 기반 구축 지시서입니다.",
        body:
          "ERP(AI OS)를 모든 GGUDDONG 프로젝트의 공식 문서 자산 관리 본부로 구축합니다. 문서를 단순 보관하는 것이 아니라 프로젝트를 복구하고 이어가기 위한 운영 자산으로 관리합니다.",
      },
      {
        id: "ERP-STATUS-20260710-001",
        type: "Project Status",
        title: "ERP Recovery Sprint 준비 상태",
        version: "v0.1",
        date: "2026-07-10",
        status: "DRAFT",
        summary:
          "ERP 프로젝트 복구를 위해 실제 React 프로젝트 구조와 마지막 작업 위치를 확인하는 상태 문서입니다.",
        body:
          "현재 ERP는 React 기반 HQ 팝업 패널 구조로 구성되어 있으며 Dashboard, Operations, Projects, AI Center, Business, Monitor 영역이 존재합니다.",
      },
      {
        id: "ERP-CONST-001",
        type: "Constitution",
        title: "GGUDDONG PROJECT 운영 헌장",
        version: "v1.0",
        date: "2026-07-10",
        status: "ACTIVE",
        summary:
          "기능보다 운영, 속도보다 방향, 추측보다 데이터, 아이디어보다 완성을 기준으로 하는 최상위 운영 원칙입니다.",
        body:
          "기억으로 이어가지 않습니다. 기록으로 이어갑니다. 모든 분석과 재개는 실제 프로젝트와 실제 문서를 기준으로 수행합니다.",
      },
    ],
  },
  {
    id: "lotto-engine-v3",
    name: "LOTTO ENGINE V3",
    type: "BUSINESS ENGINE",
    status: "STAGE2 COMPLETE",
    progress: 100,
    currentSprint: "Stage2 공식 완료",
    lastWorkOrder: "Stage2 Review / Final Filter 구조 구축",
    lastWorkReport: "Stage2 공식 완료 보고",
    nextSprint: "ERP 문서센터 등록 및 운영 자산화",
    memo: "LOTTO WORKSHOP 사업부의 핵심 분석 엔진입니다.",
    documents: [
      {
        id: "LOTTO-DECL-20260709-001",
        type: "Declaration",
        title: "LOTTO ENGINE V3 Stage2 완료선언",
        version: "v1.0",
        date: "2026-07-09",
        status: "DONE",
        summary:
          "Stage2 필터 구조와 운영 흐름이 완료되었음을 선언하는 문서입니다.",
        body:
          "LOTTO ENGINE V3 Stage2는 Review Filter와 Final Filter 중심의 운영 구조를 공식 완료했습니다.",
      },
      {
        id: "LOTTO-AUDIT-20260709-001",
        type: "Audit",
        title: "ENGINE LEGACY REVIEW V31",
        version: "v31",
        date: "2026-07-09",
        status: "DONE",
        summary:
          "Stage2 관련 Legacy 함수의 사용 여부와 삭제 가능 여부를 검토한 감사 기록입니다.",
        body:
          "Legacy 후보 함수의 활성 흐름 사용 여부를 검토하고 KEEP_ACTIVE 또는 DO_NOT_DELETE 기준으로 판단했습니다.",
      },
    ],
  },
];

const documentTypes = [
  "Work Order",
  "Work Report",
  "Declaration",
  "Audit",
  "Project Status",
  "Roadmap",
  "Constitution",
  "Lessons Learned",
];

const emptyDraft = {
  type: "Work Order",
  title: "",
  version: "v1.0",
  date: "2026-07-10",
  status: "DRAFT",
  summary: "",
  body: "",
};

function ProjectsPanel() {
  const [projectList, setProjectList] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0].id);
  const [selectedDocumentId, setSelectedDocumentId] = useState(
    initialProjects[0].documents[0]?.id ?? null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);

  const selectedProject = useMemo(
    () =>
      projectList.find((project) => project.id === selectedProjectId) ??
      projectList[0],
    [projectList, selectedProjectId],
  );

  const selectedDocument = useMemo(
    () =>
      selectedProject.documents.find(
        (document) => document.id === selectedDocumentId,
      ) ?? selectedProject.documents[0],
    [selectedDocumentId, selectedProject],
  );

  const handleSelectProject = (projectId) => {
    const nextProject = projectList.find((project) => project.id === projectId);

    setSelectedProjectId(projectId);
    setSelectedDocumentId(nextProject?.documents[0]?.id ?? null);
    setIsFormOpen(false);
    setDraft(emptyDraft);
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;

    setDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }));
  };

  const handleRegisterDocument = (event) => {
    event.preventDefault();

    if (!draft.title.trim()) return;

    const nextDocument = {
      id: createDocumentId(selectedProject.id, draft.type),
      type: draft.type,
      title: draft.title.trim(),
      version: draft.version.trim() || "v1.0",
      date: draft.date || "2026-07-10",
      status: draft.status || "DRAFT",
      summary: draft.summary.trim() || "요약이 입력되지 않았습니다.",
      body: draft.body.trim() || "본문이 입력되지 않았습니다.",
    };

    setProjectList((currentProjects) =>
      currentProjects.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,
              documents: [nextDocument, ...project.documents],
              lastWorkOrder:
                nextDocument.type === "Work Order"
                  ? nextDocument.title
                  : project.lastWorkOrder,
              lastWorkReport:
                nextDocument.type === "Work Report"
                  ? nextDocument.title
                  : project.lastWorkReport,
            }
          : project,
      ),
    );

    setSelectedDocumentId(nextDocument.id);
    setDraft(emptyDraft);
    setIsFormOpen(false);
  };

  return (
    <div className="panel-section project-document-center">
      <div className="panel-header-block project-document-header">
        <span className="panel-kicker">PROJECT DOCUMENT CENTER</span>
        <h2>프로젝트 문서센터</h2>
        <p>
          GGUDDONG HQ에서 모든 프로젝트의 작업지시서, 완료보고, 완료선언,
          감사, 상태 문서를 프로젝트 단위로 관리합니다.
        </p>
      </div>

      <div className="project-document-layout">
        <aside className="project-list-panel">
          <div className="project-list-title">
            <span>PROJECTS</span>
            <strong>{projectList.length}</strong>
          </div>

          <div className="project-list">
            {projectList.map((project) => (
              <button
                type="button"
                key={project.id}
                className={`project-list-item ${
                  selectedProject.id === project.id ? "is-active" : ""
                }`}
                onClick={() => handleSelectProject(project.id)}
              >
                <span>{project.type}</span>
                <strong>{project.name}</strong>
                <small>{project.status}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="project-status-panel">
          <div className="project-status-top">
            <div>
              <span className="project-status-label">PROJECT STATUS</span>
              <h3>{selectedProject.name}</h3>
              <p>{selectedProject.memo}</p>
            </div>

            <div className="project-progress-box">
              <strong>{selectedProject.progress}%</strong>
              <span>{selectedProject.status}</span>
            </div>
          </div>

          <div className="project-progress-bar">
            <span style={{ width: `${selectedProject.progress}%` }} />
          </div>

          <div className="project-status-grid">
            <StatusItem label="현재 Sprint" value={selectedProject.currentSprint} />
            <StatusItem label="마지막 작업지시서" value={selectedProject.lastWorkOrder} />
            <StatusItem label="마지막 완료보고" value={selectedProject.lastWorkReport} />
            <StatusItem label="다음 Sprint" value={selectedProject.nextSprint} />
          </div>

          <div className="document-workspace">
            <div className="document-list-panel">
              <div className="document-list-title">
                <span>DOCUMENTS</span>
                <strong>{selectedProject.documents.length}</strong>
              </div>

              <button
                type="button"
                className="document-create-button"
                onClick={() => setIsFormOpen((current) => !current)}
              >
                {isFormOpen ? "문서 등록 닫기" : "+ 문서 등록"}
              </button>

              {isFormOpen && (
                <DocumentForm
                  draft={draft}
                  onChange={handleDraftChange}
                  onSubmit={handleRegisterDocument}
                />
              )}

              <div className="document-list">
                {selectedProject.documents.map((document) => (
                  <button
                    type="button"
                    key={document.id}
                    className={`document-list-item ${
                      selectedDocument?.id === document.id ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedDocumentId(document.id)}
                  >
                    <span>{document.type}</span>
                    <strong>{document.title}</strong>
                    <small>
                      {document.date} · {document.version} · {document.status}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            <div className="document-detail-panel">
              {selectedDocument ? (
                <>
                  <div className="document-detail-top">
                    <span>{selectedDocument.type}</span>
                    <strong>{selectedDocument.status}</strong>
                  </div>

                  <h4>{selectedDocument.title}</h4>

                  <div className="document-meta-grid">
                    <StatusItem label="문서 ID" value={selectedDocument.id} />
                    <StatusItem label="버전" value={selectedDocument.version} />
                    <StatusItem label="작성일" value={selectedDocument.date} />
                  </div>

                  <p className="document-summary">{selectedDocument.summary}</p>

                  <div className="document-body-box">
                    <span>DOCUMENT BODY</span>
                    <p>{selectedDocument.body}</p>
                  </div>
                </>
              ) : (
                <div className="document-empty detail-empty">
                  <strong>문서 상세 없음</strong>
                  <p>프로젝트 문서가 등록되면 이 영역에서 상세 내용을 확인합니다.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DocumentForm({ draft, onChange, onSubmit }) {
  return (
    <form className="document-form" onSubmit={onSubmit}>
      <div className="document-form-row">
        <label>
          <span>문서 유형</span>
          <select name="type" value={draft.type} onChange={onChange}>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>상태</span>
          <select name="status" value={draft.status} onChange={onChange}>
            <option value="DRAFT">DRAFT</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="DONE">DONE</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </label>
      </div>

      <label>
        <span>문서 제목</span>
        <input
          name="title"
          value={draft.title}
          onChange={onChange}
          placeholder="예: ERP(AI OS) Foundation Sprint 작업지시서"
        />
      </label>

      <div className="document-form-row">
        <label>
          <span>버전</span>
          <input name="version" value={draft.version} onChange={onChange} />
        </label>

        <label>
          <span>작성일</span>
          <input name="date" type="date" value={draft.date} onChange={onChange} />
        </label>
      </div>

      <label>
        <span>요약</span>
        <textarea
          name="summary"
          rows="3"
          value={draft.summary}
          onChange={onChange}
          placeholder="이 문서의 핵심 내용을 짧게 입력합니다."
        />
      </label>

      <label>
        <span>본문</span>
        <textarea
          name="body"
          rows="6"
          value={draft.body}
          onChange={onChange}
          placeholder="작업지시서, 완료보고, 선언문 등의 본문을 입력합니다."
        />
      </label>

      <button type="submit">등록</button>
    </form>
  );
}

function StatusItem({ label, value }) {
  return (
    <div className="project-status-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function createDocumentId(projectId, type) {
  const prefix = projectId
    .split("-")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const typeCode = type
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const timestamp = Date.now().toString().slice(-6);

  return `${prefix}-${typeCode}-${timestamp}`;
}

export default ProjectsPanel;