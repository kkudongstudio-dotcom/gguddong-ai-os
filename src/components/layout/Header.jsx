import { useERP } from "../../context/useERP";

function Header() {
  const { hq, summary, divisions } = useERP();

  const getStatusClass = (status) => {
    switch (status) {
      case "ONLINE":
        return "green";
      case "READY":
      case "WARNING":
        return "yellow";
      case "ERROR":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <header className="erp-header">
      <div className="hq-status-bar">
        <div className="hq-status-main">
          <span className={`status-dot ${getStatusClass(hq.status)}`}></span>
          <strong>HQ {hq.status}</strong>
        </div>

        <div className="hq-status-item">
          <span>운영률</span>
          <strong>{hq.operationRate}%</strong>
        </div>

        <div className="hq-status-item">
          <span>사업부</span>
          <strong>{summary.divisionCount}</strong>
        </div>

        <div className="hq-status-item">
          <span>경고</span>
          <strong>{hq.alertCount}</strong>
        </div>

        {divisions.map((division) => (
          <div className="hq-status-item" key={division.code}>
            <span>{division.code}</span>
            <b className={getStatusClass(division.status)}>●</b>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;