function StatusBar() {
  return (
    <div className="hq-status-bar">
      <div className="hq-status-main">
        <span className="status-dot green"></span>
        <strong>HQ ONLINE</strong>
      </div>

      <div className="hq-status-item">
        <span>LOTTO</span>
        <b className="green">●</b>
      </div>

      <div className="hq-status-item">
        <span>AI</span>
        <b className="green">●</b>
      </div>

      <div className="hq-status-item">
        <span>ERP</span>
        <b className="green">●</b>
      </div>

      <div className="hq-status-item">
        <span>INVEST</span>
        <b className="yellow">●</b>
      </div>

      <div className="hq-status-item">
        <span>LOGISTICS</span>
        <b className="gray">●</b>
      </div>

      <div className="hq-status-item">
        <span>GAME</span>
        <b className="gray">●</b>
      </div>
    </div>
  );
}

export default StatusBar;