import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  pageTitle = 'Mensagens';

  constructor(public hs: HeaderService) {
    this.hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {
  }

}
