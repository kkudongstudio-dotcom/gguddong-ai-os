function WorkOrderCard({ order }) {
  return (
    <div className="work-order-card">
      <div className="work-order-card-head">
        <span>{order.id}</span>
        <strong>{order.status}</strong>
      </div>

      <h4>{order.title}</h4>

      <div className="work-order-card-meta">
        <p>담당: {order.owner}</p>
        <p>우선순위: {order.priority}</p>
        <p>등록: {order.createdAt || "-"}</p>
      </div>
    </div>
  );
}

export default WorkOrderCard;