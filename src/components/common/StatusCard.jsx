function StatusCard({
  title,
  value,
  description,
  status = "gray",
  progress,
  updatedAt,
}) {
  return (
    <div className={`status-card status-${status}`}>
      <div className="status-card-top">
        <h3>{title}</h3>
        <span className="status-dot" />
      </div>

      <strong>{value}</strong>

      {description && <p>{description}</p>}

      {typeof progress === "number" && (
        <div className="status-progress">
          <div className="status-progress-top">
            <span>진행률</span>
            <b>{progress}%</b>
          </div>
          <div className="status-progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {updatedAt && (
        <div className="status-updated">최근 업데이트: {updatedAt}</div>
      )}
    </div>
  );
}

export default StatusCard;