import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  pageTitle = 'Metas';

  constructor(public hs: HeaderService) {
    this.hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {
  }

}
