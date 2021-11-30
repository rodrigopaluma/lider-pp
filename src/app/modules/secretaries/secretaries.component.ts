import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-secretaries',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.scss']
})
export class SecretariesComponent implements OnInit {

  pageTitle = 'Secretarias';

  constructor(public hs: HeaderService) {
    this.hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {
  }

}
