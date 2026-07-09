function ProgressWidget({ label = "진행률", value = 0 }) {
  return (
    <div className="info-widget progress-widget">
      <div className="progress-widget-top">
        <span>{label}</span>
        <p>{value}%</p>
      </div>

      <div className="progress-widget-bar">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default ProgressWidget;