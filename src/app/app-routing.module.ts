import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './modules/announcements/announcements.component';
import { CityHallsComponent } from './modules/city-halls/city-halls.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GoalsComponent } from './modules/goals/goals.component';
import { LoginComponent } from './modules/login/login.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { SecretariesComponent } from './modules/secretaries/secretaries.component';
import { UsersComponent } from './modules/users/users.component';

import { GuardGuard } from '../../src/app/shared/guard/auth/guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard]  },
  { path: 'prefeituras', component: CityHallsComponent, canActivate: [GuardGuard] },
  { path: 'secretarias', component: SecretariesComponent, canActivate: [GuardGuard] },
  { path: 'metas', component: GoalsComponent, canActivate: [GuardGuard] },
  { path: 'usuarios', component: UsersComponent, canActivate: [GuardGuard] },
  { path: 'comunicados', component: AnnouncementsComponent, canActivate: [GuardGuard] },
  { path: 'mensagens', component: MessagesComponent, canActivate: [GuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
