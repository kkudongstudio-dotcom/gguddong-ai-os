function DashboardLayout({ header, left, right, footer }) {
  return (
    <div className="dashboard-layout">
      {header && (
        <div className="dashboard-layout-header">
          {header}
        </div>
      )}

      <div className="dashboard-layout-main">
        <div className="dashboard-layout-left">
          {left}
        </div>

        <div className="dashboard-layout-right">
          {right}
        </div>
      </div>

      {footer && (
        <div className="dashboard-layout-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;