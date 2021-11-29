import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-city-halls',
  templateUrl: './city-halls.component.html',
  styleUrls: ['./city-halls.component.scss']
})
export class CityHallsComponent implements OnInit {

  pageTitle = 'Prefeituras';

  constructor(public hs: HeaderService) { }

  ngOnInit(): void {
  }

}
