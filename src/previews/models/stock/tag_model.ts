export class TagModel {
  id: number;
  name: string;
  color: string;

  constructor(data: { id: number; name: string; color: string }) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
  }

  static fromJSON(map: Record<string, any>) {
    return new TagModel({
      id: map['id'],
      name: map['name'],
      color: `#${map['hex']}`,
    });
  }
}

export class TagCreateModel {
  name: string;
  color: string;

  constructor(data: { name: string; color: string }) {
    this.name = data.name;
    this.color = data.color;
  }

  static fromJSON(map: Record<string, any>) {
    return new TagCreateModel({
      name: map['name'],
      color: `#${map['hex']}`,
    });
  }
}

export class TagUpdateModel {
  name: string;
  color: string;

  constructor(data: { name: string; color: string }) {
    this.name = data.name;
    this.color = data.color;
  }

  toJSON(): Record<string, string> {
    return {
      name: this.name,
      color: this.color,
    };
  }
}

export type TagQueryParams = {
  cursor?: number;
  name?: string;
  aggregatedData?: boolean;
};
