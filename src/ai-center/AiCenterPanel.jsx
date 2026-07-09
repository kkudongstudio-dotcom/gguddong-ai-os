import StatusCard from "../components/common/StatusCard";

function AiCenterPanel() {
  return (
    <div className="panel-section">
      <div className="panel-header-block">
        <span className="panel-kicker">AI CENTER</span>
        <h2>AI 센터</h2>
        <p>
          GGUDDONG HQ에서 운영하는 AI 직원과 자동화 시스템의 상태를 확인합니다.
        </p>
      </div>

      <div className="status-card-grid">
        <StatusCard
          title="ERP HQ AI"
          value="ONLINE"
          description="ERP HQ 운영을 지원하는 메인 AI입니다."
          status="green"
        />

        <StatusCard
          title="LOTTO MASTER AI"
          value="대기"
          description="LOTTO WORKSHOP과 연동 준비 중입니다."
          status="yellow"
        />

        <StatusCard
          title="REPORT AI"
          value="준비 중"
          description="자동 보고서 및 브리핑 기능을 준비하고 있습니다."
          status="gray"
        />

        <StatusCard
          title="DESIGN AI"
          value="준비 중"
          description="콘텐츠 및 디자인 생성 기능을 준비하고 있습니다."
          status="gray"
        />
      </div>
    </div>
  );
}

export default AiCenterPanel;