import DashboardPanel from "../../dashboard";
import OperationsPanel from "../../operations";
import DocumentManagementPanel from "../../document-management";
import AiCenterPanel from "../../ai-center";
import BusinessPanel from "../../business";
import MonitorPanel from "../../monitor";

const panelMap = {
  Dashboard: DashboardPanel,
  "오늘 작업": OperationsPanel,
  문서관리: DocumentManagementPanel,
  "AI 센터": AiCenterPanel,
  사업부: BusinessPanel,
  관제센터: MonitorPanel,
};

function FloatingPanel({ title, onClose }) {
  const ActivePanel = panelMap[title];

  const isWidePanel =
    title === "Dashboard" ||
    title === "문서관리";

  return (
    <div className="panel-overlay" onClick={onClose}>
      <section
        className={`floating-panel ${
          isWidePanel ? "floating-panel-wide" : ""
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="panel-close"
          onClick={onClose}
          aria-label="패널 닫기"
        >
          ×
        </button>

        {ActivePanel ? (
          <ActivePanel />
        ) : (
          <>
            <span className="panel-label">GGUDDONG AI OS</span>
            <h2>{title}</h2>
            <p>등록되지 않은 패널입니다.</p>
          </>
        )}
      </section>
    </div>
  );
}

export default FloatingPanel;