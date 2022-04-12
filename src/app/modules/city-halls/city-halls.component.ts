import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { CityHall } from 'src/app/shared/models/city-hall';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CityHallService } from 'src/app/shared/services/city-hall.service';

@Component({
  selector: 'app-city-halls',
  templateUrl: './city-halls.component.html',
  styleUrls: ['./city-halls.component.scss']
})
export class CityHallsComponent extends BaseResourceListComponent<CityHall> {

  pageTitle = 'Prefeituras';

  constructor(public hs: HeaderService, private cityHallService: CityHallService) {
    super(cityHallService);
    this.hs.pTitle = this.pageTitle;
    console.log(this.resources);
  }

  ngOnInit(): void {
  }

}
