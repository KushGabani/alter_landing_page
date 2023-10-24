import {
  ClientModel,
  CreateChallanLineItemWithChallan,
  DesignModel,
  StocktypeModel,
} from "../../models";
import { InspectionStatus, JobStatus, StockCategory } from "../../models/types";

import {
  ChallanExpectModel,
  CreateChallanExpectWithChallan,
  ChallanLineItemModel,
} from "../../models";
import { getServerDate } from "../../components/global/utils";
import { ChallanSeriesModel } from "./challan_series_model";
import {
  ChallanIssueModel,
  CreateChallanIssueWithChallan,
} from "./challan_issue_model";

export class ChallanModel {
  readonly id: number;
  readonly challanNo: string;
  readonly isSubChallan: boolean;
  readonly clientChallanId?: string;
  readonly category: StockCategory;
  readonly client: ClientModel;
  readonly type?: StocktypeModel;
  readonly issueDate: Date;
  readonly dueDate: Date;
  readonly designs: DesignModel[];
  readonly lot?: string;
  readonly jobStatus: JobStatus;
  readonly notes?: string;
  readonly expect?: ChallanExpectModel[];
  readonly lineitems?: ChallanLineItemModel[];
  readonly mainChallanIds: number[];
  readonly parentChallanIds: number[];
  readonly issued?: ChallanIssueModel[];
  readonly billId?: number;

  constructor(data: {
    id: number;
    challanNo: string;
    isSubChallan: boolean;
    clientChallanId?: string;
    category: StockCategory;
    client: ClientModel;
    type?: StocktypeModel;
    issueDate: Date;
    dueDate: Date;
    designs: DesignModel[];
    lot?: string;
    jobStatus: JobStatus;
    notes?: string;
    expect?: ChallanExpectModel[];
    lineitems?: ChallanLineItemModel[];
    mainChallanIds: number[];
    parentChallanIds: number[];
    issued?: ChallanIssueModel[];
    billId?: number;
  }) {
    this.id = data.id;
    this.challanNo = data.challanNo.toUpperCase();
    this.isSubChallan = data.isSubChallan;
    this.clientChallanId = data.clientChallanId;
    this.category = data.category;
    this.client = data.client;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.designs = data.designs;
    this.lot = data.lot;
    this.jobStatus = data.jobStatus;
    this.notes = data.notes;
    this.expect = data.expect;
    this.lineitems = data.lineitems;
    this.mainChallanIds = data.mainChallanIds;
    this.parentChallanIds = data.parentChallanIds;
    this.issued = data.issued;
    this.billId = data.billId;
  }

  static fromJSON(map: { [key: string]: any }): ChallanModel {
    return new ChallanModel({
      id: map["id"],
      challanNo: map["challanNo"]?.toUpperCase(),
      isSubChallan: map["isSubChallan"],
      clientChallanId: map["clientChallanId"]?.toUpperCase(),
      category: new StockCategory(map["category"]),
      client: ClientModel.fromJSON(map["client"]),
      type: map["type"] ? StocktypeModel.fromJSON(map["type"]) : undefined,
      issueDate: new Date(map["issueDate"]),
      dueDate: new Date(map["dueDate"]),
      designs: map["Designs"]
        ? map["Designs"].map((e: Record<string, any>) =>
            DesignModel.fromJSON(e)
          )
        : undefined,
      lot: map["lot"],
      jobStatus: new JobStatus(map["jobStatus"]),
      notes: map["notes"] ?? undefined,
      expect: map["ChallanExpectation"]
        ? map["ChallanExpectation"].map((e: Record<string, any>) =>
            ChallanExpectModel.fromJSON(e)
          )
        : undefined,
      billId: map["billId"],
      mainChallanIds: map["MainChallans"]
        ? map["MainChallans"].map((e: Record<string, any>) =>
            parseInt(e["id"].toString())
          )
        : [],
      parentChallanIds: map["ParentChallans"]
        ? map["ParentChallans"].map((e: Record<string, any>) =>
            parseInt(e["id"].toString())
          )
        : [],
      issued: map["ChallanIssue"]
        ? map["ChallanIssue"].map((e: Record<string, any>) =>
            ChallanIssueModel.fromJSON(e)
          )
        : undefined,
      lineitems: map["ChallanLineItem"]
        ? map["ChallanLineItem"].map((e: Record<string, any>) =>
            ChallanLineItemModel.fromJSON(e)
          )
        : undefined,
    });
  }

  toChallanListModel(): ChallanListModel {
    return new ChallanListModel({
      id: this.id,
      challanNo: this.challanNo,
      isSubChallan: this.isSubChallan,
      category: this.category,
      type: this.type,
      issueDate: this.issueDate,
      dueDate: this.dueDate,
      designs: this.designs,
      lot: this.lot,
      client: this.client,
      clientChallanId: this.clientChallanId,
      jobStatus: this.jobStatus,
      billId: this.billId,
      notes: this.notes,
      mainChallanIds: this.mainChallanIds,
      parentChallanIds: this.parentChallanIds,
    });
  }
}

export class ChallanListModel {
  id: number;
  challanNo: string;
  isSubChallan: boolean;
  category: StockCategory;
  client: ClientModel;
  clientChallanId?: string;
  type?: StocktypeModel;
  issueDate: Date;
  dueDate: Date;
  designs: DesignModel[];
  lot?: string;
  jobStatus: JobStatus;
  billId?: number;
  notes?: string;
  mainChallans?: MainChallan[];
  mainChallanIds: number[];
  parentChallanIds: number[]; // property only available for challan graph view

  constructor(data: {
    id: number;
    challanNo: string;
    isSubChallan: boolean;
    clientChallanId?: string;
    client: ClientModel;
    category: StockCategory;
    type?: StocktypeModel;
    issueDate: Date;
    dueDate: Date;
    designs: DesignModel[];
    lot?: string;
    jobStatus: JobStatus;
    billId?: number;
    notes?: string;
    mainChallans?: MainChallan[];
    mainChallanIds: number[];
    parentChallanIds: number[];
  }) {
    this.id = data.id;
    this.challanNo = data.challanNo;
    this.isSubChallan = data.isSubChallan;
    this.clientChallanId = data.clientChallanId;
    this.client = data.client;
    this.category = data.category;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.designs = data.designs;
    this.lot = data.lot;
    this.jobStatus = data.jobStatus;
    this.billId = data.billId;
    this.notes = data.notes;
    this.mainChallans = data.mainChallans;
    this.mainChallanIds = data.mainChallanIds;
    this.parentChallanIds = data.parentChallanIds;
  }

  static fromJSON(
    map: Record<string, any>,
    clientMap?: Record<string, any>
  ): ChallanListModel {
    return new ChallanListModel({
      id: map["id"],
      challanNo: map["challanNo"]?.toUpperCase(),
      isSubChallan: map["isSubChallan"] ?? false,
      clientChallanId: map["clientChallanId"],
      client: clientMap
        ? ClientModel.fromJSON(clientMap)
        : ClientModel.fromJSON(map["client"]),
      category: new StockCategory(map["category"]),
      type: map["type"] ? StocktypeModel.fromJSON(map["type"]) : undefined,
      issueDate: new Date(map["issueDate"]),
      dueDate: new Date(map["dueDate"]),
      designs: map["Designs"]
        ? map["Designs"].map((e: Record<string, any>) =>
            DesignModel.fromJSON(e)
          )
        : [],
      lot: map["lot"],
      jobStatus: new JobStatus(map["jobStatus"]),
      billId: map["billId"] ?? undefined,
      notes: map["notes"] ?? undefined,
      mainChallans:
        map["MainChallans"] && map["MainChallans"]
          ? map["MainChallans"]
              .filter((e: Record<string, any>) => e["client"] !== undefined)
              .map((e: Record<string, any>) => MainChallan.fromJSON(e))
          : undefined,
      mainChallanIds: map["MainChallans"]
        ? map["MainChallans"].map((e: Record<string, any>) => parseInt(e["id"]))
        : [],
      parentChallanIds: map["ParentChallans"]
        ? map["ParentChallans"].map((e: Record<string, any>) =>
            parseInt(e["id"])
          )
        : [],
    });
  }
}

class MainChallan {
  id: number;
  challanNo: string;
  isSubChallan: boolean;
  category: StockCategory;
  client: ClientModel;
  clientChallanId?: string;
  type?: StocktypeModel;
  issueDate: Date;
  dueDate: Date;
  lot?: string;
  jobStatus: JobStatus;
  notes?: string;

  constructor(data: {
    id: number;
    challanNo: string;
    isSubChallan: boolean;
    clientChallanId?: string;
    client: ClientModel;
    category: StockCategory;
    type?: StocktypeModel;
    issueDate: Date;
    dueDate: Date;
    lot?: string;
    jobStatus: JobStatus;
    notes?: string;
  }) {
    this.id = data.id;
    this.challanNo = data.challanNo;
    this.isSubChallan = data.isSubChallan;
    this.clientChallanId = data.clientChallanId;
    this.client = data.client;
    this.category = data.category;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.lot = data.lot;
    this.jobStatus = data.jobStatus;
    this.notes = data.notes;
  }

  static fromJSON(map: Record<string, any>): MainChallan {
    return new MainChallan({
      id: map["id"],
      challanNo: map["challanNo"]?.toUpperCase(),
      isSubChallan: map["isSubChallan"] ?? false,
      clientChallanId: map["clientChallanId"],
      client: ClientModel.fromJSON(map["client"]),
      category: new StockCategory(map["category"]),
      type: map["type"] ? StocktypeModel.fromJSON(map["type"]) : undefined,
      issueDate: new Date(map["issueDate"]),
      dueDate: new Date(map["dueDate"]),
      lot: map["lot"],
      jobStatus: new JobStatus(map["jobStatus"]),
      notes: map["notes"] ?? undefined,
    });
  }
}

export class ChallanResponseModel {
  id: number;
  challanNo: string;
  category: StockCategory;
  clientId: number;
  typeId?: number;
  issueDate: Date;
  dueDate: Date;
  designId?: number;
  lot?: string;
  jobStatus: JobStatus;
  notes?: string;
  mainChallanId?: number;

  constructor(data: {
    id: number;
    challanNo: string;
    category: StockCategory;
    clientId: number;
    typeId?: number;
    issueDate: Date;
    dueDate: Date;
    designId?: number;
    lot?: string;
    jobStatus: JobStatus;
    notes?: string;
    mainChallanId?: number;
  }) {
    this.id = data.id;
    this.challanNo = data.challanNo;
    this.clientId = data.clientId;
    this.category = data.category;
    this.typeId = data.typeId;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.designId = data.designId;
    this.lot = data.lot;
    this.jobStatus = data.jobStatus;
    this.notes = data.notes;
    this.mainChallanId = data.mainChallanId;
  }

  static fromJSON(map: Record<string, any>): ChallanResponseModel {
    return new ChallanResponseModel({
      id: map["id"],
      challanNo: map["challanNo"]?.toUpperCase(),
      clientId: map["clientId"],
      category: new StockCategory(map["category"]),
      typeId: map["typeId"],
      issueDate: new Date(map["issueDate"]),
      dueDate: new Date(map["dueDate"]),
      designId: map["designId"],
      lot: map["lot"],
      jobStatus: new JobStatus(map["jobStatus"]),
      notes: map["notes"] ?? undefined,
      mainChallanId: map["mainChallanId"],
    });
  }
}

export class CreateChallanModel {
  series?: ChallanSeriesModel;
  challanNo: string;
  isSubChallan: boolean;
  category: StockCategory;
  clientChallanId?: string;
  client: ClientModel;
  type?: StocktypeModel;
  issueDate: Date;
  dueDays: number; // ONLY FOR FORMS
  dueDate: Date;
  designs: DesignModel[];
  lot?: string;
  notes?: string;
  total?: number; // ONLY FOR FORMS
  fromProcess?: StockCategory; // ONLY FOR FORMS
  fromChallans: ChallanListModel[]; // ONLY FOR FORMS
  mainChallanIds: number[];
  parentChallanIds: number[];
  autoIssue: boolean;
  expectations: CreateChallanExpectWithChallan[];
  lineitems: CreateChallanLineItemWithChallan[];
  issue: CreateChallanIssueWithChallan[];

  constructor(data: {
    series?: ChallanSeriesModel;
    challanNo: string;
    isSubChallan: boolean;
    category: StockCategory;
    clientChallanId?: string;
    client: ClientModel;
    type?: StocktypeModel;
    issueDate: Date;
    dueDays: number;
    dueDate: Date;
    designs: DesignModel[];
    lot?: string;
    notes?: string;
    fromProcess?: StockCategory;
    fromChallans: ChallanListModel[];
    mainChallanIds: number[];
    parentChallanIds: number[];
    autoIssue: boolean;
    expectations: CreateChallanExpectWithChallan[];
    lineitems: CreateChallanLineItemWithChallan[];
    issue: CreateChallanIssueWithChallan[];
  }) {
    this.series = data.series;
    this.challanNo = data.challanNo;
    this.isSubChallan = data.isSubChallan;
    this.category = data.category;
    this.clientChallanId = data.clientChallanId;
    this.client = data.client;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDays = data.dueDays;
    this.dueDate = data.dueDate;
    this.designs = data.designs;
    this.lot = data.lot;
    this.notes = data.notes;
    this.fromProcess = data.fromProcess;
    this.fromChallans = data.fromChallans;
    this.mainChallanIds = data.mainChallanIds;
    this.parentChallanIds = data.parentChallanIds;
    this.autoIssue = data.autoIssue;
    this.expectations = data.expectations;
    this.lineitems = data.lineitems;
    this.issue = data.issue;
  }

  toJSON(): Record<
    string,
    string | undefined | Record<string, string | undefined>[]
  > {
    console.log(this);
    return {
      serialId: this.series?.id.toString(),
      challanNo: this.challanNo.toUpperCase(),
      isSubChallan: this.isSubChallan.toString(),
      category: this.category.key,
      challanClientId: this.clientChallanId?.toString(),
      clientId: this.client.id.toString(),
      typeId: this.type?.id.toString(),
      issueDate: getServerDate(this.issueDate),
      dueDate: getServerDate(this.dueDate),
      designId:
        this.designs.length > 0
          ? this.designs.map((e) => e.id).join(",")
          : undefined,
      lot: this.lot,
      notes: this.notes,
      mainChallanIds:
        this.mainChallanIds.length > 0
          ? this.mainChallanIds.join(",")
          : undefined,
      parentChallanIds:
        this.parentChallanIds.length > 0
          ? this.parentChallanIds.join(",")
          : undefined,
      autoIssue: this.autoIssue ? "true" : "false",
      expectations: this.expectations.map((e) => e.toJSON()),
      lineitems: this.lineitems.map((e) => e.toJSON()),
      issue: this.issue.map((e) => e.toJSON()),
    };
  }
}

export class UpdateChallanModel {
  challanNo?: string;
  category?: StockCategory;
  clientChallanId?: string;
  client?: ClientModel;
  type?: StocktypeModel;
  issueDate?: Date;
  dueDays?: number;
  dueDate?: Date;
  lot?: string;
  notes?: string;

  constructor(data: {
    challanNo?: string;
    category?: StockCategory;
    clientChallanId?: string;
    client?: ClientModel;
    type?: StocktypeModel;
    issueDate?: Date;
    dueDays?: number;
    dueDate?: Date;
    lot?: string;
    notes?: string;
  }) {
    this.challanNo = data.challanNo;
    this.clientChallanId = data.clientChallanId;
    this.client = data.client;
    this.category = data.category;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.lot = data.lot;
    this.notes = data.notes;
  }

  toJSON(): Record<string, string | undefined | Record<string, string>[]> {
    return {
      challanNo: this.challanNo ? this.challanNo.toUpperCase() : undefined,
      clientId: this.client?.id.toString(),
      category: this.category?.key,
      typeId: this.type?.id.toString(),
      issueDate: this.issueDate ? getServerDate(this.issueDate) : undefined,
      dueDate: this.dueDate ? getServerDate(this.dueDate) : undefined,
      lot: this.lot,
      notes: this.notes,
    };
  }
}

export type ChallanQueryParams = {
  cursor?: number;
  id?: number;
  search?: string;
  exact?: boolean;
  isSubChallan?: boolean;
  category?: StockCategory[];
  notCategory?: StockCategory[];
  clients?: ClientModel[];
  types?: StocktypeModel[];
  notTypes?: StocktypeModel[];
  designs?: DesignModel[];
  startIssueDate?: Date;
  endIssueDate?: Date;
  startDueDate?: Date;
  endDueDate?: Date;
  lot?: string;
  jobStatus?: JobStatus;
  sortby?: string;
  mainChallanIds?: number[];
  parentChallanIds?: number[];
  mainChallanClient?: ClientModel;
  issuePending?: boolean;
  hasBill?: boolean;
  aggregatedData?: boolean;
  receiveStatus?: InspectionStatus;
  includeMainChallans?: boolean;
  onlyCount?: boolean;
};
