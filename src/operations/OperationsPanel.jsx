import { useState } from "react";

import "../components/widgets/widgets.css";

import { InfoWidget, StatusWidget } from "../components/widgets";

import WorkFlowSteps from "./WorkFlowSteps";
import WorkOrderInput from "./WorkOrderInput";
import TodayWorkBoard from "./TodayWorkBoard";
import WorkOrderList from "./WorkOrderList";

const initialWorkOrders = [
  {
    id: "WO-001",
    title: "GGUDDONG HQ 핵심 기능 기준 정리",
    status: "접수",
    priority: "최우선",
    owner: "기획실장 AI",
    createdAt: "2026. 07. 02. 19:00",
  },
  {
    id: "WO-002",
    title: "작업지시서 등록 시스템 준비",
    status: "분석",
    priority: "높음",
    owner: "ERP HQ",
    createdAt: "2026. 07. 02. 19:10",
  },
];

function OperationsPanel() {
  const [workOrders, setWorkOrders] = useState(initialWorkOrders);

  const handleAddWorkOrder = (content) => {
    const now = new Date();

    const createdAt = now.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const nextOrder = {
      id: `WO-${String(workOrders.length + 1).padStart(3, "0")}`,
      title: content.split("\n")[0].slice(0, 40) || "새 작업지시서",
      status: "접수",
      priority: "보통",
      owner: "기획실장 AI",
      createdAt,
    };

    setWorkOrders([nextOrder, ...workOrders]);
  };

  return (
    <div className="panel-section operations-panel">
      <div className="panel-header-block">
        <span className="panel-kicker">OPERATIONS</span>

        <h2>작업관리</h2>

        <p>
          대표가 오늘 집중할 작업과 작업지시서 흐름을 관리하는 HQ 작업실입니다.
        </p>
      </div>

      <div className="operations-summary">
        <InfoWidget label="전체 작업" value={`${workOrders.length}건`} />
        <StatusWidget label="진행중" value="분석" type="yellow" />
        <InfoWidget label="검수대기" value="0건" />
        <InfoWidget label="완료" value="0건" />
      </div>

      <div className="operations-main">
        <div className="operations-left">
          <TodayWorkBoard workOrders={workOrders} />
          <WorkOrderList workOrders={workOrders} />
        </div>

        <div className="operations-right">
          <WorkOrderInput onSubmit={handleAddWorkOrder} />
        </div>
      </div>

      <WorkFlowSteps />
    </div>
  );
}

export default OperationsPanel;