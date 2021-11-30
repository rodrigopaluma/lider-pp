import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  pageTitle = 'Comunicados';

  constructor(public hs: HeaderService) {
    this.hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {
  }

}
