import "./monitor.css";

const monitorItems = [
  {
    id: "api",
    label: "API",
    status: "NORMAL",
    description: "Web API 연결 상태",
  },
  {
    id: "worker",
    label: "Cloudflare Workers",
    status: "ONLINE",
    description: "Workers URL 운영 상태",
  },
  {
    id: "scheduler",
    label: "Scheduler",
    status: "READY",
    description: "자동 실행 준비 상태",
  },
  {
    id: "gas",
    label: "Google Apps Script",
    status: "ONLINE",
    description: "GAS 백엔드 연결 상태",
  },
  {
    id: "log",
    label: "System Log",
    status: "NORMAL",
    description: "최근 오류 없음",
  },
  {
    id: "document",
    label: "Document Store",
    status: "READY",
    description: "문서관리 저장소 준비 상태",
  },
];

function MonitorPanel() {
  return (
    <section className="monitor-panel">
      <header className="monitor-panel-header">
        <p className="panel-eyebrow">MONITOR CENTER</p>
        <h2>관제센터</h2>
        <p>AI OS의 API, 실행 모듈, 자동화 시스템 상태를 확인합니다.</p>
      </header>

      <div className="monitor-grid">
        {monitorItems.map((item) => (
          <article key={item.id} className="monitor-card">
            <div className="monitor-card-header">
              <h3>{item.label}</h3>
              <span className="monitor-status">{item.status}</span>
            </div>

            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MonitorPanel;