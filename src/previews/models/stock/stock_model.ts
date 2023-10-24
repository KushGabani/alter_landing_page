import { DesignModel, StocktypeModel, ChallanListModel } from "../../models";
import { type Unit } from "../../models/types/basic";
import { SerialStatus, StockCategory } from "../../models/types";

export class StockModel {
  id: number;
  name: string;
  design?: DesignModel;
  unit: Unit;
  hsn?: string;
  minimum?: number;
  serialCount?: number;
  serialQty?: number;

  constructor(data: {
    id: number;
    name: string;
    design?: DesignModel;
    unit: Unit;
    hsn?: string;
    minimum?: number;
    serialCount?: number;
    serialQty?: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.design = data.design;
    this.unit = data.unit;
    this.hsn = data.hsn;
    this.minimum = data.minimum;
    this.serialCount = data.serialCount;
    this.serialQty = data.serialQty;
  }

  static fromJSON(map: Record<string, any>) {
    return new StockModel({
      id: map["id"],
      design: map["design"] ? DesignModel.fromJSON(map["design"]) : undefined,
      name: map["name"],
      unit: map["unit"],
      hsn: map["hsn"],
      minimum: map["minimum"],
      serialCount: map["_count"] ? map["_count"]["Serial"] : undefined,
    });
  }
}

export class CreateStockModel {
  name: string;
  design?: DesignModel;
  unit: Unit;
  hsn?: string;
  minimum?: number;

  constructor(data: {
    name: string;
    design?: DesignModel;
    unit: Unit;
    hsn?: string;
    minimum?: number;
  }) {
    this.name = data.name;
    this.design = data.design;
    this.unit = data.unit;
    this.hsn = data.hsn;
    this.minimum = data.minimum;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      name: this.name.toString(),
      unit: this.unit,
      designId: this.design?.id.toString(),
      hsn: this.hsn && this.hsn!.toString().length > 0 ? this.hsn : undefined,
      minimum:
        this.minimum && this.minimum?.toString().length > 0
          ? this.minimum.toString()
          : undefined,
    };
  }
}

export class UpdateStockModel {
  name?: string;
  designId?: number;
  unit: Unit;
  hsn?: string;
  minimum?: number;
  aggregatedData?: boolean;
  constructor(data: {
    name?: string;
    designId?: number;
    unit: Unit;
    hsn?: string;
    minimum?: number;
    aggregatedData?: boolean;
  }) {
    this.name = data.name;
    this.designId = data.designId;
    this.unit = data.unit;
    this.hsn = data.hsn;
    this.minimum = data.minimum;
    this.aggregatedData = data.aggregatedData;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      name: this.name?.toString(),
      unit: this.unit,
      designId: this.designId?.toString(),
      hsn: this.hsn,
      minimum: this.minimum?.toString(),
      aggregatedData: this.aggregatedData ? "true" : "false",
    };
  }
}

export type StockQueryParams = {
  cursor?: number;
  challans?: ChallanListModel[];
  types?: StocktypeModel[];
  notTypes?: StocktypeModel[];
  category?: StockCategory[];
  notCategory?: StockCategory[];
  designs?: DesignModel[];
  search?: string;
  orderBy?: string;
  status?: SerialStatus;
  aggregatedData?: boolean;
  onlyCount?: boolean;
  includeSerialCount?: boolean;
};

export type StockGetAllResponse = {
  data: StockModel[];
  count?: number;
};
