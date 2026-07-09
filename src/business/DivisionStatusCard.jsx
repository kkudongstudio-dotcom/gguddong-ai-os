function DivisionStatusCard({
  name,
  code,
  status = "PREPARING",
  statusType = "gray",
  progress = 0,
  lastRun = "-",
  lastWork = "-",
  lastError = "없음",
  onClick,
}) {
  return (
    <button
      type="button"
      className={`division-status-card division-${statusType}`}
      onClick={onClick}
    >
      <div className="division-status-head">
        <div>
          <span className="division-code">{code}</span>
          <h3>{name}</h3>
        </div>

        <div className="division-state">
          <span className="division-state-dot" />
          <strong>{status}</strong>
        </div>
      </div>

      <div className="division-progress">
        <div className="division-progress-top">
          <span>진행률</span>
          <b>{progress}%</b>
        </div>

        <div className="division-progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="division-info-list">
        <div>
          <span>최근 실행</span>
          <p>{lastRun}</p>
        </div>

        <div>
          <span>최근 작업</span>
          <p>{lastWork}</p>
        </div>

        <div>
          <span>최근 오류</span>
          <p>{lastError}</p>
        </div>
      </div>
    </button>
  );
}

export default DivisionStatusCard;