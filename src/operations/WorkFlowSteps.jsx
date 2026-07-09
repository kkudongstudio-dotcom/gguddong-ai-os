const workFlowSteps = [
  "접수",
  "분석",
  "작업중",
  "검수대기",
  "승인완료",
  "ERP기록",
  "AI학습",
];

function WorkFlowSteps() {
  return (
    <div className="workflow-steps">
      {workFlowSteps.map((step, index) => (
        <div className="workflow-step" key={step}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

export default WorkFlowSteps;