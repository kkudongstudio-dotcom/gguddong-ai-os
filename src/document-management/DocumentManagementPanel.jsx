import { useEffect, useMemo, useState } from "react";

import "./document-management.css";

import {
  createDocument,
  getDocuments,
  getDocumentById,
} from "./stores/DocumentStore";

import DocumentMenu from "./components/DocumentMenu";
import DocumentViewer from "./components/DocumentViewer";
import NewDocumentModal from "./components/NewDocumentModal";

const categoryOrder = [
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

function DocumentManagementPanel() {
  const [documents, setDocuments] = useState(() => getDocuments());
  const [isNewDocumentModalOpen, setIsNewDocumentModalOpen] =
    useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const availableCategories = useMemo(() => {
    const categories = [
      ...new Set(
        documents.map((document) => document.category || "기타")
      ),
    ];

    return categoryOrder.filter((category) =>
      categories.includes(category)
    );
  }, [documents]);

  const [activeCategory, setActiveCategory] = useState(
    () => availableCategories[0] || "기타"
  );

  const [activeDocumentId, setActiveDocumentId] = useState(
    () => documents[0]?.id || null
  );

  const filteredDocuments = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesCategory =
        document.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const searchableText = [
        document.title,
        document.category,
        document.author,
        document.status,
        document.content,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [documents, activeCategory, searchKeyword]);

  useEffect(() => {
    if (
      availableCategories.length > 0 &&
      !availableCategories.includes(activeCategory)
    ) {
      setActiveCategory(availableCategories[0]);
    }
  }, [availableCategories, activeCategory]);

  useEffect(() => {
    const activeDocumentExists = filteredDocuments.some(
      (document) => document.id === activeDocumentId
    );

    if (!activeDocumentExists) {
      setActiveDocumentId(filteredDocuments[0]?.id || null);
    }
  }, [filteredDocuments, activeDocumentId]);

  const activeDocument =
    filteredDocuments.find(
      (document) => document.id === activeDocumentId
    ) ||
    filteredDocuments[0] ||
    getDocumentById(activeDocumentId);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setSearchKeyword("");

    const firstDocument = documents.find(
      (document) => document.category === category
    );

    setActiveDocumentId(firstDocument?.id || null);
  }

  function handleCreateDocument(documentInput) {
    try {
      const newDocument = createDocument(documentInput);
      const nextDocuments = getDocuments();

      setDocuments(nextDocuments);
      setActiveCategory(newDocument.category);
      setActiveDocumentId(newDocument.id);
      setSearchKeyword("");
      setIsNewDocumentModalOpen(false);
    } catch (error) {
      console.error("문서 저장 실패:", error);
    }
  }

  return (
    <section className="document-management-panel">
      <div className="document-management-top">
        <div className="document-management-header">
          <p className="panel-eyebrow">DOCUMENT MANAGEMENT</p>
          <h2>문서관리</h2>

          <span className="document-management-status">
            OFFICIAL ARCHIVE
          </span>
        </div>

        <div className="document-management-tools">
          <div className="document-search-area">
            <div className="document-search-row">
              <input
                type="search"
                className="document-search-input"
                placeholder="문서 검색..."
                value={searchKeyword}
                onChange={(event) =>
                  setSearchKeyword(event.target.value)
                }
              />

              {searchKeyword && (
                <button
                  type="button"
                  className="document-search-clear"
                  onClick={() => setSearchKeyword("")}
                  aria-label="검색어 지우기"
                >
                  ×
                </button>
              )}
            </div>

            <div className="document-search-summary">
              <span>{activeCategory}</span>
              <strong>{filteredDocuments.length}개 문서</strong>
            </div>
          </div>

          <button
            type="button"
            className="new-document-open-button"
            onClick={() => setIsNewDocumentModalOpen(true)}
          >
            + 새 문서
          </button>
        </div>
      </div>

      <div className="document-category-tabs">
        {availableCategories.map((category) => {
          const categoryCount = documents.filter(
            (document) => document.category === category
          ).length;

          return (
            <button
              key={category}
              type="button"
              className={`document-category-tab ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              <span>{category}</span>
              <small>{categoryCount}</small>
            </button>
          );
        })}
      </div>

      <div className="document-management-body">
        <DocumentMenu
          documents={filteredDocuments}
          activeDocumentId={activeDocument?.id}
          onSelectDocument={setActiveDocumentId}
        />

        <DocumentViewer document={activeDocument} />
      </div>

      {isNewDocumentModalOpen && (
        <NewDocumentModal
          onClose={() => setIsNewDocumentModalOpen(false)}
          onSave={handleCreateDocument}
        />
      )}
    </section>
  );
}

export default DocumentManagementPanel;