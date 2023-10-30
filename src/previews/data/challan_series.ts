import type { ChallanSeriesModel } from "../models";
import { JobStatus, StockCategory } from "../models/types";

export const series: ChallanSeriesModel[] = [
  {
    id: 1,
    category: new StockCategory("JOBWORK"),
    prefix: "J",
    number: 2,
    def: false,
  },
  {
    id: 2,
    category: new StockCategory("JOBWORK"),
    prefix: "JB",
    number: 5,
    def: false,
    suffix: "23/24",
  },
  {
    id: 3,
    category: new StockCategory("JOBWORK"),
    prefix: "E",
    number: 1,
    def: false,
  },
];
