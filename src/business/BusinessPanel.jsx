import { useState } from "react";

import "./business.css";
import "./division-status-card.css";

import BusinessList from "./BusinessList";
import BusinessDetail from "./BusinessDetail";

function BusinessPanel() {
  const [selectedDivision, setSelectedDivision] = useState(null);

  return (
    <div className="panel-section">
      <div className="panel-header-block">
        <span className="panel-kicker">BUSINESS DIVISIONS</span>

        <h2>사업부 현황</h2>

        <p>
          GGUDDONG HQ에서 운영 중인 사업부의 현재 상태를 모니터링합니다.
        </p>
      </div>

      {!selectedDivision && <BusinessList onSelect={setSelectedDivision} />}

      {selectedDivision && (
        <BusinessDetail
          division={selectedDivision}
          onBack={() => setSelectedDivision(null)}
        />
      )}
    </div>
  );
}

export default BusinessPanel;