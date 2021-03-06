import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageTitle: string = '';
  pageSubtitle: string = '';

  constructor(public hs: HeaderService, public authService: AuthService) {
    this.hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pageTitle = this.hs.pTitle;
      this.pageSubtitle = this.hs.pSubtitle;
    }, 500);

  }

}
