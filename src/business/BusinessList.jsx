import DivisionStatusCard from "./DivisionStatusCard";
import { getDivisionStatusList } from "./services/divisionService";

function BusinessList({ onSelect }) {
  const divisions = getDivisionStatusList();

  return (
    <div className="division-grid">
      {divisions.map((division) => (
        <DivisionStatusCard
          key={division.code}
          {...division}
          onClick={() => onSelect(division)}
        />
      ))}
    </div>
  );
}

export default BusinessList;