function TodayWorkBoard({ workOrders = [] }) {
  const todayWorks = workOrders.slice(0, 5);

  return (
    <div className="today-work-board">
      <h3>오늘 작업</h3>

      {todayWorks.length === 0 ? (
        <div className="today-work-empty">
          오늘 등록된 작업이 없습니다.
        </div>
      ) : (
        <div className="work-order-items">
          {todayWorks.map((work) => (
            <div className="work-order-item" key={work.id}>
              <div>
                <span>{work.id}</span>
                <strong>{work.title}</strong>
              </div>

              <div>
                <p>{work.status}</p>
                <small>
                  {work.priority} · {work.owner}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodayWorkBoard;