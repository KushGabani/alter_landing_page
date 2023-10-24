import { ChallanIssueModel, SerialModel } from "../models";
import { StockCategory } from "../models/types";
import { challans } from "./challan";
import { stocks } from "./stock";

export const challan_issue = [
  new ChallanIssueModel({
    id: 1,
    challanId: 1,
    date: new Date(),
    issued: false,
    qty: 50,
    serial: new SerialModel({
      id: 0,
      category: new StockCategory("INWARD"),
      qty: 50,
      stockId: stocks[0].id,
      stock: stocks[0],
    }),
    challan: challans[0],
  }),
  new ChallanIssueModel({
    id: 2,
    challanId: 2,
    date: new Date(),
    issued: false,
    qty: 25,
    serial: new SerialModel({
      id: 0,
      category: new StockCategory("INWARD"),
      qty: 25,
      stockId: stocks[1].id,
      stock: stocks[1],
    }),
    challan: challans[1],
  }),
  new ChallanIssueModel({
    id: 3,
    challanId: 4,
    date: new Date(),
    issued: false,
    qty: 35,
    serial: new SerialModel({
      id: 0,
      category: new StockCategory("INWARD"),
      qty: 35,
      stockId: stocks[3].id,
      stock: stocks[3],
    }),
    challan: challans[3],
  }),
];
