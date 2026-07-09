import DashboardPanel from "../../dashboard";
import OperationsPanel from "../../operations";
import ProjectsPanel from "../../projects";
import AiCenterPanel from "../../ai-center";
import BusinessPanel from "../../business";
import MonitorPanel from "../../monitor";

const panelMap = {
  Dashboard: DashboardPanel,
  작업관리: OperationsPanel,
  프로젝트: ProjectsPanel,
  "AI 센터": AiCenterPanel,
  사업부: BusinessPanel,
  관제센터: MonitorPanel,
};

function FloatingPanel({ title, onClose }) {
  const ActivePanel = panelMap[title];

  return (
    <div className="panel-overlay" onClick={onClose}>
      <section
        className="floating-panel"
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
            <span className="panel-label">GGUDDONG HQ</span>
            <h2>{title}</h2>
            <p>등록되지 않은 패널입니다.</p>
          </>
        )}
      </section>
    </div>
  );
}

export default FloatingPanel;