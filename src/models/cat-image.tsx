import { BreedData } from './breed';

export interface CatImageData {
  id: string;
  url: string;
  breeds: BreedData[]
}

export class CatImageModel {
  public id: string;

  public url: string;

  public breedName: string;

  public origin: string;

  public temperament: string;

  public description: string;

  constructor({ id, url, breeds }: CatImageData) {
    this.id = id;
    this.url = url;
    this.breedName = breeds[0].name;
    this.origin = breeds[0].origin;
    this.temperament = breeds[0].temperament;
    this.description = breeds[0].description;
  }
}
