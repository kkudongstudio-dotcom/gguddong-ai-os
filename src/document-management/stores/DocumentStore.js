const initialDocuments = [
  {
    id: "doc_ai_os_overview",
    category: "운영정책",
    title: "GGUDDONG AI OS 개요",
    status: "진행중",
    updatedAt: "2026-07-10",
    author: "AI DIRECTOR",
    content:
      "GGUDDONG AI OS는 ERP가 아니라 AI 운영체제(HQ)이다.\n\nAI SECRETARY, AI DIRECTOR, CONTENT CENTER를 중심으로 업무 접수, 분류, 문서 생성, 작업보고 및 운영 상태 관리를 수행한다.",
  },
  {
    id: "doc_project_center_status",
    category: "업무보고",
    title: "문서관리 리팩토링 진행 보고",
    status: "진행중",
    updatedAt: "2026-07-10",
    author: "AI DIRECTOR",
    content:
      "기존 Project Center 구조를 문서관리 구조로 변경했다.\n\n문서관리는 공식 문서의 보관과 조회를 담당하며, 작업지시서 등록과 업무 접수는 오늘 작업 영역에서 담당한다.",
  },
  {
    id: "doc_ai_secretary",
    category: "AI 보고서",
    title: "AI SECRETARY 구축 현황",
    status: "완료",
    updatedAt: "2026-07-10",
    author: "AI SECRETARY",
    content:
      "업무 접수, 업무 분류, Router, Dispatch, Response, 업무 로그 및 Web API 구성이 완료되었다.\n\n다음 단계에서는 접수된 업무를 기준으로 공식 문서를 자동 생성한다.",
  },
  {
    id: "doc_ai_director",
    category: "AI 보고서",
    title: "AI DIRECTOR 구축 현황",
    status: "진행중",
    updatedAt: "2026-07-10",
    author: "AI DIRECTOR",
    content:
      "Work Receive, Analyzer, Planner, Router 구성이 완료되었다.\n\n향후 업무 분석 결과와 작업보고를 문서관리에 자동 저장한다.",
  },
  {
    id: "doc_content_center",
    category: "사업부 문서",
    title: "CONTENT CENTER 구축 현황",
    status: "완료",
    updatedAt: "2026-07-10",
    author: "CONTENT MASTER",
    content:
      "LOTTO WORKSHOP ReadOnly 연동, CONTENT ANALYST, CONTENT PLANNER, CONTENT MASTER, BLOG MASTER, NOTICE MASTER, 초안 저장 및 Web API 구성이 완료되었다.",
  },
];

let documents = [...initialDocuments];

function createDocumentId() {
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

/* ======================================================
   Read
====================================================== */

export function getDocuments() {
  return [...documents];
}

export function getDocumentById(documentId) {
  return (
    documents.find((document) => document.id === documentId) ||
    documents[0] ||
    null
  );
}

/* ======================================================
   Create
====================================================== */

export function createDocument(documentInput) {
  if (!documentInput || typeof documentInput !== "object") {
    throw new Error("문서 데이터가 필요합니다.");
  }

  const title = normalizeText(documentInput.title);
  const content = normalizeText(documentInput.content);

  if (!title) {
    throw new Error("문서 제목이 필요합니다.");
  }

  if (!content) {
    throw new Error("문서 내용이 필요합니다.");
  }

  const newDocument = {
    id: documentInput.id || createDocumentId(),
    category: normalizeText(documentInput.category) || "기타",
    title,
    status: normalizeText(documentInput.status) || "검토중",
    updatedAt: documentInput.updatedAt || getTodayString(),
    author: normalizeText(documentInput.author) || "AI SECRETARY",
    content,
  };

  documents = [newDocument, ...documents];

  return newDocument;
}

/* ======================================================
   Update
====================================================== */

export function updateDocument(documentId, updates) {
  const targetIndex = documents.findIndex(
    (document) => document.id === documentId
  );

  if (targetIndex === -1) {
    throw new Error(`문서를 찾을 수 없습니다: ${documentId}`);
  }

  const currentDocument = documents[targetIndex];

  const updatedDocument = {
    ...currentDocument,
    ...updates,
    id: currentDocument.id,
    updatedAt: updates?.updatedAt || getTodayString(),
  };

  documents = documents.map((document) =>
    document.id === documentId ? updatedDocument : document
  );

  return updatedDocument;
}

/* ======================================================
   Delete
====================================================== */

export function deleteDocument(documentId) {
  const documentExists = documents.some(
    (document) => document.id === documentId
  );

  if (!documentExists) {
    return false;
  }

  documents = documents.filter(
    (document) => document.id !== documentId
  );

  return true;
}

/* ======================================================
   Search
====================================================== */

export function searchDocuments(keyword) {
  const normalizedKeyword = normalizeText(keyword).toLowerCase();

  if (!normalizedKeyword) {
    return getDocuments();
  }

  return documents.filter((document) => {
    const searchableText = [
      document.title,
      document.category,
      document.status,
      document.author,
      document.content,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedKeyword);
  });
}

/* ======================================================
   Utility
====================================================== */

export function resetDocuments() {
  documents = [...initialDocuments];

  return getDocuments();
}