import "../components/widgets/widgets.css";
import "../components/layouts/layouts.css";

import {
  InfoWidget,
  ProgressWidget,
  StatusWidget,
} from "../components/widgets";

import { DashboardLayout } from "../components/layouts";

function MonitorPanel() {
  return (
    <DashboardLayout
      header={
        <div className="panel-header-block">
          <span className="panel-kicker">HQ MONITOR</span>

          <h2>운영 관제센터</h2>

          <p>
            GGUDDONG HQ의 전체 운영 상태와 사업부 흐름을 확인합니다.
          </p>
        </div>
      }
      left={
        <>
          <StatusWidget
            label="HQ 상태"
            value="ONLINE"
            type="green"
          />

          <ProgressWidget
            label="전체 운영률"
            value={82}
          />

          <InfoWidget
            label="최근 이벤트"
            value="LOTTO 후보풀 생성 완료"
          />

          <InfoWidget
            label="주의 상태"
            value="0건"
          />
        </>
      }
      right={
        <>
          <StatusWidget
            label="LOTTO WORKSHOP"
            value="ONLINE"
            type="green"
          />

          <StatusWidget
            label="INVEST DIVISION"
            value="READY"
            type="yellow"
          />

          <StatusWidget
            label="LOGISTICS"
            value="PREPARING"
            type="gray"
          />

          <StatusWidget
            label="GAME STUDIO"
            value="PREPARING"
            type="gray"
          />
        </>
      }
    />
  );
}

export default MonitorPanel;