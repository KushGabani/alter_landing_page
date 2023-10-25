import { ChallanListModel } from "../models";
import { JobStatus, StockCategory } from "../models/types";
import { clients } from "./clients";
import { designs } from "./design";
import { stocktypes } from "./stocktype";

export const graph_challans = [
  new ChallanListModel({
    id: 1,
    category: new StockCategory("INWARD"),
    challanNo: "I-23",
    client: clients[3],
    designs: designs.slice(0, 2),
    issueDate: new Date("2023-08-08"),
    dueDate: new Date("2023-08-15"),
    isSubChallan: false,
    jobStatus: new JobStatus("COMPLETE"),
    mainChallanIds: [],
    parentChallanIds: [],
    lot: "A",
  }),
  new ChallanListModel({
    id: 2,
    type: stocktypes[0],
    category: new StockCategory("JOBWORK"),
    challanNo: "J-11.1.1",
    client: clients[0],
    designs: [designs[0]],
    issueDate: new Date("2023-08-12"),
    dueDate: new Date("2023-08-15"),
    isSubChallan: false,
    jobStatus: new JobStatus("COMPLETE"),
    mainChallanIds: [1],
    parentChallanIds: [1],
    lot: "A",
  }),
  new ChallanListModel({
    id: 3,
    type: stocktypes[0],
    category: new StockCategory("JOBWORK"),
    challanNo: "J-11.1.2",
    client: clients[1],
    designs: [designs[1]],
    issueDate: new Date("2023-08-13"),
    dueDate: new Date("2023-08-15"),
    isSubChallan: false,
    jobStatus: new JobStatus("COMPLETE"),
    mainChallanIds: [1],
    parentChallanIds: [1],
    lot: "A",
  }),
  new ChallanListModel({
    id: 4,
    type: stocktypes[1],
    category: new StockCategory("JOBWORK"),
    challanNo: "J-11.2",
    client: clients[2],
    designs: designs.slice(0, 2),
    issueDate: new Date("2023-08-17"),
    dueDate: new Date("2023-08-23"),
    isSubChallan: false,
    jobStatus: new JobStatus("COMPLETE"),
    mainChallanIds: [1],
    parentChallanIds: [2, 3],
    lot: "A",
  }),
  new ChallanListModel({
    id: 5,
    type: stocktypes[3],
    category: new StockCategory("JOBWORK"),
    challanNo: "J-11.3.1",
    client: clients[5],
    designs: designs.slice(0, 2),
    issueDate: new Date("2023-08-20"),
    dueDate: new Date("2023-08-26"),
    isSubChallan: false,
    jobStatus: new JobStatus("COMPLETE"),
    mainChallanIds: [1],
    parentChallanIds: [4],
    lot: "A",
  }),
  new ChallanListModel({
    id: 6,
    type: stocktypes[3],
    category: new StockCategory("JOBWORK"),
    challanNo: "J-11.3.2",
    client: clients[5],
    designs: designs.slice(0, 2),
    issueDate: new Date("2023-08-20"),
    dueDate: new Date("2023-08-26"),
    isSubChallan: false,
    jobStatus: new JobStatus("PART_RECEIVED"),
    mainChallanIds: [1],
    parentChallanIds: [4],
    lot: "A",
  }),
  new ChallanListModel({
    id: 7,
    category: new StockCategory("OUTWARD"),
    challanNo: "O-28",
    client: clients[3],
    designs: designs.slice(0, 2),
    issueDate: new Date("2023-08-23"),
    dueDate: new Date("2023-08-24"),
    isSubChallan: false,
    jobStatus: new JobStatus("IN_PROCESS"),
    mainChallanIds: [1],
    parentChallanIds: [5, 6],
    lot: "A",
  }),
];

export const receivedItems = [
  [],
  [
    {
      name: "Red Kali",
      received: "30 / 30 KALI",
    },
    {
      name: "Rani Kali",
      received: "30 / 30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      received: "30 / 30 KALI",
    },
  ],
  [
    {
      name: "Rani Kali",
      received: "30 / 30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      received: "30 / 30 KALI",
    },
    {
      name: "Rani Kali",
      received: "30 / 30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      received: "30 / 30 KALI",
    },
  ],
  [
    {
      name: "Rani Kali",
      received: "15 / 30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      received: "0 / 30 KALI",
    },
    { name: "Rani Kali", received: "0 / 30 KALI" },
  ],
];

export const issuedItems = [
  [],
  [],
  [
    {
      name: "Red Kali",
      tag: "Inward",
      received: "30 KALI",
    },
  ],
  [
    {
      name: "Rani Kali",
      tag: "Inward",
      received: "30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      tag: "Embroidery",
      received: "30 KALI",
    },
    {
      name: "Rani Kali",
      tag: "Embroidery",
      received: "30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      tag: "Diamond",
      received: "30 KALI",
    },
  ],
  [
    {
      name: "Rani Kali",
      tag: "Diamond",
      received: "30 KALI",
    },
  ],
  [
    {
      name: "Red Kali",
      tag: "Dhaaga Cutting",
      received: "30 KALI",
    },
    {
      name: "Rani Kali",
      tag: "Dhaaga Cutting",
      received: "15 KALI",
    },
  ],
];
