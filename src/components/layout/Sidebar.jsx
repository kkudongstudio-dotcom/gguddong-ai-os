function Sidebar({ onOpenPanel }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">GG</div>

        <div>
          <strong>GGUDDONG HQ</strong>
          <span>ERP</span>
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
          onClick={() => onOpenPanel("작업관리")}
        >
          작업관리
        </button>

        <button
          type="button"
          className="sidebar-menu-item"
          onClick={() => onOpenPanel("프로젝트")}
        >
          프로젝트
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
        <strong>READ ONLY</strong>
      </div>
    </aside>
  );
}

export default Sidebar;