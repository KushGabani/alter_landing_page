import { StockCategory } from "../models/types";
import { SerialModel } from "../models";
import { stocks } from "./stock";

export const serials = [
  new SerialModel({
    id: 1,
    stockId: 1,
    category: new StockCategory("INWARD"),
    qty: 50,
    stock: stocks[0],
  }),
  new SerialModel({
    id: 2,
    stockId: 1,
    category: new StockCategory("INWARD"),
    qty: 25,
    stock: stocks[0],
  }),
  new SerialModel({
    id: 3,
    stockId: 2,
    category: new StockCategory("INWARD"),
    qty: 25,
    stock: stocks[1],
  }),
  new SerialModel({
    id: 4,
    stockId: 5,
    category: new StockCategory("PURCHASE"),
    qty: 500,
    stock: stocks[4],
  }),
  new SerialModel({
    id: 5,
    stockId: 4,
    category: new StockCategory("JOBWORK"),
    qty: 30,
    stock: stocks[3],
  }),
];
