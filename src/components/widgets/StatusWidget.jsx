function StatusWidget({
  label,
  value,
  type = "gray",
}) {
  return (
    <div className={`info-widget status-widget status-${type}`}>
      <span>{label}</span>

      <div className="status-widget-value">
        <div className="status-widget-dot" />
        <p>{value}</p>
      </div>
    </div>
  );
}

export default StatusWidget;