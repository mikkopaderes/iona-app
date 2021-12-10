export interface BreedData {
  id: string;
  name: string;
  description: string;
  origin: string;
  temperament: string;
}

export class BreedModel {
  public id: string;

  public name: string;

  public description: string;

  public origin: string;

  public temperament: string;

  constructor({
    id,
    name,
    description,
    origin,
    temperament,
  }: BreedData) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.origin = origin;
    this.temperament = temperament;
  }
}
