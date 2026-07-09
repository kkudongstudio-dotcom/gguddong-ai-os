function DashboardPanel() {
  return (
    <>
      <span className="panel-label">HQ DASHBOARD</span>
      <h2>Dashboard</h2>
      <p>본사 운영 상태를 한눈에 확인하는 기본 화면입니다.</p>

      <div className="panel-mini-grid">
        <div className="panel-mini-card is-green">HQ 상태</div>
        <div className="panel-mini-card is-green">사업부 요약</div>
        <div className="panel-mini-card is-gray">최근 작업</div>
      </div>
    </>
  );
}

export default DashboardPanel;