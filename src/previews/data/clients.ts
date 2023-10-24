import { ClientModel } from "../models";
import { ClientCategory } from "../models/types";

export const clients = [
  new ClientModel({
    id: 1,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Akshar Arts",
  }),
  new ClientModel({
    id: 2,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Jai Diamonds",
  }),
  new ClientModel({
    id: 3,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Phoenix Creation",
  }),
  new ClientModel({
    id: 4,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Mahesh Textile",
  }),
  new ClientModel({
    id: 5,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Prism Enterprise",
  }),
  new ClientModel({
    id: 6,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Ram Krishna",
  }),
  new ClientModel({
    id: 7,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Ajay Threads",
  }),
  new ClientModel({
    id: 8,
    category: new ClientCategory("JOBWORK_PARTY"),
    name: "Raj Looms",
  }),
];
