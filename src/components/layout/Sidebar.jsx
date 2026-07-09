function Sidebar({ onOpenPanel }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">GG</div>

        <div>
          <strong>GGUDDONG AI OS</strong>
          <span>HQ</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <button
          type="button"
          className="sidebar-menu-item active"
          onClick={() => onOpenPanel("Dashboard")}
        >
          Dashboard
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("오늘 작업")}
        >
          오늘 작업
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("Project Center")}
        >
          프로젝트
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("프로젝트 문서")}
        >
          프로젝트 문서
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("AI 센터")}
        >
          AI 센터
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("사업부")}
        >
          사업부
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("관제센터")}
        >
          관제센터
        </button>
      </nav>

      <div className="sidebar-footer">
        <span>HQ MODE</span>
        <strong>AI OS</strong>
      </div>
    </aside>
  );
}

export default Sidebar;