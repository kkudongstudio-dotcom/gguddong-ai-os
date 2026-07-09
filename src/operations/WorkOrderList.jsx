import WorkOrderCard from "./WorkOrderCard";

function WorkOrderList({ workOrders = [] }) {
  return (
    <div className="work-order-list">
      <h3>작업 목록</h3>

      <div className="work-order-items">
        {workOrders.map((order) => (
          <WorkOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default WorkOrderList;