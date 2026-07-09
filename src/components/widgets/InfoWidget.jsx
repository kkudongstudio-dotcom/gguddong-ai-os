function InfoWidget({ label, value }) {
  return (
    <div className="info-widget">
      <span>{label}</span>
      <p>{value || "-"}</p>
    </div>
  );
}

export default InfoWidget;