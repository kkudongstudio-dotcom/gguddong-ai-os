import { createContext } from "react";
import { getDivisionStatusList } from "../business/services/divisionService";

export const ERPContext = createContext(null);

export function ERPProvider({ children }) {
  const divisions = getDivisionStatusList();

  const onlineCount = divisions.filter(
    (division) => division.status === "ONLINE"
  ).length;

  const warningCount = divisions.filter(
    (division) =>
      division.status === "READY" ||
      division.status === "WARNING" ||
      division.status === "ERROR"
  ).length;

  const erpState = {
    hq: {
      status: "ONLINE",
      operationRate: 82,
      alertCount: 0,
      lastEvent: "LOTTO 후보풀 생성 완료",
    },

    summary: {
      divisionCount: divisions.length,
      onlineCount,
      warningCount,
      aiCount: 1,
    },

    divisions,
  };

  return (
    <ERPContext.Provider value={erpState}>
      {children}
    </ERPContext.Provider>
  );
}