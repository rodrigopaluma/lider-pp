import { BaseResourceModel } from "./base-resource.model";

export class CityHall extends BaseResourceModel {

  constructor(
    id?: number,
    cityHallCode?: string,
    cityHallName?: string,
    cityHallProvince?: string
  ){
    super();
  }

  // Retorna o tipo da entrada
  static fromJson(jsonData: any): CityHall {
    return Object.assign(new CityHall(), jsonData);
  }
}
