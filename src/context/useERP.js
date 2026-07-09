import { useContext } from "react";
import { ERPContext } from "./ERPContext";

export function useERP() {
  return useContext(ERPContext);
}