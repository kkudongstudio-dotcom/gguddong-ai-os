function DivisionCard({ name, status, statusType }) {
  return (
    <div className={`panel-mini-card division-card ${statusType}`}>
      <strong className="division-name">{name}</strong>
      <span className="division-status">● {status}</span>
    </div>
  );
}

export default DivisionCard;