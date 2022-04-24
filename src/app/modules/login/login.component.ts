import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  isRegistred: boolean = false;

  ngOnInit(): void {
    localStorage.removeItem('user')
  }

  verifyStatusUser() {
    this.isRegistred = !this.isRegistred;
  }

  lostPassword() {
    console.log('Modal Perdeu a Senha')
  }


}
