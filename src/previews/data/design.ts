import { DesignModel } from "../models";
import { DesignStatus } from "../models/types";

export const designs = [
  new DesignModel({
    id: 1,
    code: "2001",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 2,
    code: "2002",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 3,
    code: "2003",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 4,
    code: "R-01",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 5,
    code: "R-02",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 6,
    code: "R-08",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 7,
    code: "A-100",
    status: new DesignStatus("COMPLETE"),
  }),
  new DesignModel({
    id: 8,
    code: "A-101",
    status: new DesignStatus("COMPLETE"),
  }),
];
