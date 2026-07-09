import "../components/widgets/widgets.css";
import { InfoWidget } from "../components/widgets";

function BusinessDetail({ division, onBack }) {
  const monitor = division.monitor || {};

  return (
    <div className="business-detail">
      <button type="button" className="business-back-button" onClick={onBack}>
        ← 사업부 목록
      </button>

      <div className="business-detail-head">
        <div>
          <span>{division.code}</span>
          <h3>{division.name}</h3>
        </div>

        <strong>{division.status}</strong>
      </div>

      <div className="business-detail-grid">
        <InfoWidget label="운영 상태" value={division.status} />
        <InfoWidget label="진행률" value={`${division.progress}%`} />
        <InfoWidget label="AI 상태" value={monitor.ai} />
        <InfoWidget label="ENGINE" value={monitor.engine} />
        <InfoWidget label="SCHEDULER" value={monitor.scheduler} />
        <InfoWidget label="REPORT" value={monitor.report} />
        <InfoWidget label="최근 실행" value={division.lastRun} />
        <InfoWidget label="최근 완료 작업" value={division.lastWork} />
        <InfoWidget label="최근 오류" value={division.lastError} />
      </div>
    </div>
  );
}

export default BusinessDetail;