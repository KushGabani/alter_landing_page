import { DesignCostingListModel, DesignModel } from "../../models";

export class DesignPartModel {
  id: number;
  designId: number;
  name: string;
  costing?: DesignCostingListModel[];

  constructor(data: {
    id: number;
    designId: number;
    name: string;
    costing?: DesignCostingListModel[];
  }) {
    this.id = data.id;
    this.designId = data.designId;
    this.name = data.name;
    this.costing = data.costing;
  }

  static fromMap(map: Record<string, any>): DesignPartModel {
    return new DesignPartModel({
      id: map["id"],
      designId: map["designId"],
      name: map["name"],
      costing: map["DesignCosting"]
        ? (map["DesignCosting"] as any[]).map((e) =>
            DesignCostingListModel.fromMap(e)
          )
        : undefined,
    });
  }
}

export class CreateDesignPartModel {
  design: DesignModel;
  name: string;

  constructor(data: { design: DesignModel; name: string }) {
    this.design = data.design;
    this.name = data.name;
  }

  toJSON(): Record<string, string> {
    return {
      designId: this.design.id.toString(),
      name: this.name,
    };
  }
}

export class UpdateCreateDesignPartModel {
  design?: DesignModel;
  name?: string;

  constructor(data: { design: DesignModel; name: string }) {
    this.design = data.design;
    this.name = data.name;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      designId: this.design?.id.toString(),
      name: this.name,
    };
  }
}

export type PartQueryParams = {
  designId?: number;
  name?: string;
};
