import { BaseResourceModel } from "./base-resource.model";

import { CityHall } from "./city-hall";

export class Secretary extends BaseResourceModel {

  constructor(
    public secCode?: string,
    public secName?: string,
    public secAbreviation?: string,

    public cityHallCode?: CityHall
  ){
    super();
  }

  // Retorna o tipo da entrada
  static fromJson(jsonData: any): Secretary {
    return Object.assign(new Secretary(), jsonData);
  }
}
