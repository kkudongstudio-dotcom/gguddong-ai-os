export default function ProjectCenterPanel() {
  return (
    <div className="panel">

      <h2>PROJECT CENTER</h2>

      <p>
        GGUDDONG 프로젝트 운영 본부
      </p>

      <div className="project-center-grid">

        <div className="project-card">
          <h3>Project Status</h3>
          <p>프로젝트 진행 현황</p>
        </div>

        <div className="project-card">
          <h3>Document Center</h3>
          <p>작업지시서 / 보고서</p>
        </div>

        <div className="project-card">
          <h3>Roadmap</h3>
          <p>개발 계획</p>
        </div>

        <div className="project-card">
          <h3>Declaration</h3>
          <p>완료 선언</p>
        </div>

      </div>

    </div>
  );
}