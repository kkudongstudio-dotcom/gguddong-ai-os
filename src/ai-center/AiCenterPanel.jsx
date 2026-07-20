import StatusCard from "../components/common/StatusCard";

import "./AiCenterPanel.css";

const aiMembers = [
  {
    id: "ai-secretary",
    title: "AI SECRETARY",
    value: "ONLINE",
    description: "업무 접수 · 업무 분류 · 공식 문서 생성",
    status: "green",
  },
  {
    id: "ai-director",
    title: "AI DIRECTOR",
    value: "대기",
    description: "업무 분석 · 작업 계획 · 업무 라우팅",
    status: "yellow",
  },
  {
    id: "content-master",
    title: "CONTENT MASTER",
    value: "ONLINE",
    description: "콘텐츠 운영 · 제작 관리 · 최종 검토",
    status: "green",
  },
  {
    id: "notice-master",
    title: "NOTICE MASTER",
    value: "준비중",
    description: "공지 작성 · 운영 브리핑 · 안내 문서 관리",
    status: "gray",
  },
];

const recentAiLogs = [
  {
    id: "log-001",
    time: "15:42",
    aiName: "AI SECRETARY",
    action: "작업지시서 접수",
    status: "완료",
  },
  {
    id: "log-002",
    time: "15:42",
    aiName: "AI SECRETARY",
    action: "업무 접수 문서 생성",
    status: "완료",
  },
  {
    id: "log-003",
    time: "15:43",
    aiName: "AI DIRECTOR",
    action: "업무 분석 대기열 등록",
    status: "대기",
  },
];

function AiCenterPanel() {
  const onlineCount = aiMembers.filter(
    (member) => member.value === "ONLINE"
  ).length;

  const waitingCount = aiMembers.filter(
    (member) => member.value === "대기"
  ).length;

  return (
    <div className="panel-section ai-center-panel">
      <div className="panel-header-block">
        <span className="panel-kicker">AI CENTER</span>

        <h2>AI 센터</h2>

        <p>
          GGUDDONG AI 직원의 운영 상태와 최근 업무 처리 기록을
          확인합니다.
        </p>
      </div>

      <div className="ai-center-summary">
        <div className="ai-center-summary-item">
          <span>등록 AI</span>
          <strong>{aiMembers.length}명</strong>
        </div>

        <div className="ai-center-summary-item">
          <span>온라인</span>
          <strong>{onlineCount}명</strong>
        </div>

        <div className="ai-center-summary-item">
          <span>대기</span>
          <strong>{waitingCount}명</strong>
        </div>

        <div className="ai-center-summary-item">
          <span>최근 오류</span>
          <strong>0건</strong>
        </div>
      </div>

      <section className="ai-center-section">
        <div className="ai-center-section-header">
          <div>
            <span>AI STAFF</span>
            <h3>AI 직원 상태</h3>
          </div>

          <strong>{aiMembers.length}명 운영</strong>
        </div>

        <div className="status-card-grid ai-center-card-grid">
          {aiMembers.map((member) => (
            <StatusCard
              key={member.id}
              title={member.title}
              value={member.value}
              description={member.description}
              status={member.status}
            />
          ))}
        </div>
      </section>

      <section className="ai-center-section ai-center-log-section">
        <div className="ai-center-section-header">
          <div>
            <span>AI ACTIVITY</span>
            <h3>최근 AI 작업</h3>
          </div>

          <strong>{recentAiLogs.length}건</strong>
        </div>

        <div className="ai-log-list">
          {recentAiLogs.map((log) => (
            <article key={log.id} className="ai-log-item">
              <time>{log.time}</time>

              <strong>{log.aiName}</strong>

              <p>{log.action}</p>

              <span
                className={`ai-log-status ${
                  log.status === "완료"
                    ? "complete"
                    : log.status === "대기"
                      ? "waiting"
                      : ""
                }`}
              >
                {log.status}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AiCenterPanel;