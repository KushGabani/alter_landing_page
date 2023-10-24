import { DesignPartModel, StockModel } from "../../models";

export class DesignCostingModel {
  id: number;
  part: DesignPartModel;
  typeId: number;
  stock?: StockModel;
  units: number;
  subUnits: number;
  group: number;
  ratePerGroup: number;

  constructor(data: {
    id: number;
    part: DesignPartModel;
    typeId: number;
    stock?: StockModel;
    units?: number;
    subUnits?: number;
    group?: number;
    ratePerGroup?: number;
  }) {
    this.id = data.id;
    this.part = data.part;
    this.typeId = data.typeId;
    this.stock = data.stock;
    this.units = data.units || 1;
    this.subUnits = data.subUnits || 1;
    this.group = data.group || 1;
    this.ratePerGroup = data.ratePerGroup || 0;
  }

  static fromMap(map: { [key: string]: any }): DesignCostingModel {
    return new DesignCostingModel({
      id: map["id"],
      part: DesignPartModel.fromMap(map["partId"]),
      typeId: map["typeId"],
      stock: map["stock"] ? StockModel.fromJSON(map["stock"]) : undefined,
      units: map["units"],
      subUnits: map["subUnits"],
      group: map["group"],
      ratePerGroup: parseFloat(map["ratePerGroup"].toString()),
    });
  }
}

export class DesignCostingListModel {
  id: number;
  partId: number;
  typeId: number;
  stock?: StockModel;
  units: number;
  subUnits: number;
  group: number;
  ratePerGroup: number;

  constructor(data: {
    id: number;
    partId: number;
    typeId: number;
    stock?: StockModel;
    units?: number;
    subUnits?: number;
    group?: number;
    ratePerGroup?: number;
  }) {
    this.id = data.id;
    this.partId = data.partId;
    this.typeId = data.typeId;
    this.stock = data.stock;
    this.units = data.units || 1;
    this.subUnits = data.subUnits || 1;
    this.group = data.group || 1;
    this.ratePerGroup = data.ratePerGroup || 0;
  }

  static fromMap(map: Record<string, any>): DesignCostingListModel {
    return new DesignCostingListModel({
      id: map["id"],
      partId: map["partId"],
      typeId: map["typeId"],
      stock: map["stock"] ? StockModel.fromJSON(map["stock"]) : undefined,
      units: map["units"],
      subUnits: map["subUnits"],
      group: map["group"],
      ratePerGroup: parseFloat(map["ratePerGroup"].toString()),
    });
  }
}

export class CreateDesignCostingModel {
  part: DesignPartModel;
  typeId: number;
  stock?: StockModel;
  units: number;
  subUnits: number;
  group: number;
  ratePerGroup: number;

  constructor(data: {
    part: DesignPartModel;
    typeId: number;
    stock?: StockModel;
    units: number;
    subUnits: number;
    group: number;
    ratePerGroup: number;
  }) {
    this.part = data.part;
    this.typeId = data.typeId;
    this.stock = data.stock;
    this.units = data.units || 1;
    this.subUnits = data.subUnits || 1;
    this.group = data.group || 1;
    this.ratePerGroup = data.ratePerGroup || 0;
  }

  fromMap(): Record<string, string | undefined> {
    return {
      partId: this.part.id.toString(),
      typeId: this.typeId.toString(),
      stockId: this.stock?.id.toString(),
      units: this.units.toString(),
      subUnits: this.subUnits.toString(),
      group: this.group.toString(),
      ratePerGroup: this.ratePerGroup.toString(),
    };
  }
}

export class UpdateDesignCostingModel {
  units?: number;
  subUnits?: number;
  group?: number;
  ratePerGroup?: number;

  constructor(data: {
    units?: number;
    subUnits?: number;
    group?: number;
    ratePerGroup?: number;
  }) {
    this.units = data.units;
    this.subUnits = data.subUnits;
    this.group = data.group;
    this.ratePerGroup = data.ratePerGroup;
  }

  fromMap(): Record<string, string | undefined> {
    return {
      units: this.units?.toString(),
      subUnits: this.subUnits?.toString(),
      group: this.group?.toString(),
      ratePerGroup: this.ratePerGroup?.toString(),
    };
  }
}

export type CostingQueryParams = {
  partId: number;
};
