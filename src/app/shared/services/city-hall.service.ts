import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CityHall } from '../models/city-hall';

@Injectable({
  providedIn: 'root'
})
export class CityHallService extends BaseResourceService<CityHall> {

  constructor( protected injector: Injector) {
    super('api/city-halls', injector, CityHall.fromJson);
  }
}
