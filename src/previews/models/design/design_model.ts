import { DesignStatus } from "../../models/types";

export class DesignModel {
  id: number;
  code: string;
  status: DesignStatus;
  file?: string;
  notes?: string;

  constructor(data: {
    id: number;
    code: string;
    status: DesignStatus;
    file?: string;
    notes?: string;
  }) {
    this.id = data.id;
    this.code = data.code;
    this.status = data.status;
    this.file = data.file;
    this.notes = data.notes;
  }

  static fromJSON(map: Record<string, any>) {
    return new DesignModel({
      id: map["id"],
      code: map["code"],
      status: new DesignStatus(map["status"]),
      file: map["file"],
      notes: map["notes"] ?? undefined,
    });
  }
}

export class CreateDesignModel {
  code: string;
  status: DesignStatus;
  file?: string;
  notes?: string;

  constructor(data: {
    code: string;
    status: DesignStatus;
    file?: string;
    notes?: string;
  }) {
    this.code = data.code;
    this.status = data.status;
    this.file = data.file;
    this.notes = data.notes;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      code: this.code,
      status: this.status.key,
      file: this.file && this.file.length > 1 ? this.file : undefined,
      notes: this.notes && this.notes.length > 1 ? this.notes : undefined,
    };
  }
}

export class UpdateDesignModel {
  code?: string;
  status?: DesignStatus;
  file?: string;
  notes?: string;

  constructor(data: {
    code?: string;
    status?: DesignStatus;
    file?: string;
    notes?: string;
  }) {
    this.code = data.code;
    this.status = data.status;
    this.file = data.file;
    this.notes = data.notes;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      code: this.code,
      status: this.status?.key,
      file: this.file,
      notes: this.notes,
    };
  }
}

export type DesignQueryParams = {
  cursor?: number;
  search?: string;
  status?: DesignStatus;
  aggregatedData?: boolean;
  onlyCount?: boolean;
};
