import DashboardPanel from "../../dashboard";
import OperationsPanel from "../../operations";
import ProjectsPanel from "../../projects";
import ProjectCenterPanel from "../../project-center";
import AiCenterPanel from "../../ai-center";
import BusinessPanel from "../../business";
import MonitorPanel from "../../monitor";

const panelMap = {
  Dashboard: DashboardPanel,
  "오늘 작업": OperationsPanel,
  프로젝트: ProjectsPanel,
  "Project Center": ProjectCenterPanel,
  "AI 센터": AiCenterPanel,
  사업부: BusinessPanel,
  관제센터: MonitorPanel,
};

function FloatingPanel({ title, onClose }) {
  const ActivePanel = panelMap[title];

  const isWidePanel =
    title === "Project Center";

  return (
    <div className="panel-overlay" onClick={onClose}>
      <section
        className={`floating-panel ${
          isWidePanel ? "floating-panel-wide" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="panel-close"
          onClick={onClose}
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