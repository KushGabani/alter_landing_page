export class StocktypeModel {
  id: number;
  name: string;
  hex: string;

  constructor(data: { id: number; name: string; hex: string }) {
    this.id = data.id;
    this.name = data.name;
    this.hex = data.hex;
  }

  static fromJSON(map: Record<string, any>) {
    return new StocktypeModel({
      id: map["id"],
      name: map["name"],
      hex: `#${map["hex"]}`,
    });
  }
}

export class CreateStocktypeModel {
  name: string;
  hex: string;

  constructor(data: { name: string; hex?: string }) {
    this.name = data.name;
    // create a random color if not provided
    this.hex = data.hex || "#000000";
  }

  toJSON() {
    return {
      name: this.name,
      hex: this.hex.toString().slice(1),
    };
  }
}
