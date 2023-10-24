import { ChallanExpectModel } from "../models";
import { challans } from "./challan";
import { stocks } from "./stock";

export const challan_expect = [
  new ChallanExpectModel({
    id: 1,
    challanId: 2,
    qty: 25,
    stock: stocks[1],
    inspectedQty: 0,
    challan: challans[1],
  }),
  new ChallanExpectModel({
    id: 1,
    challanId: 3,
    qty: 50,
    stock: stocks[3],
    inspectedQty: 0,
    challan: challans[2],
  }),
];
