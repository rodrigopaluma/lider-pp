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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'prefeituras', component: CityHallsComponent },
  { path: 'secretarias', component: SecretariesComponent },
  { path: 'metas', component: GoalsComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'comunicados', component: AnnouncementsComponent },
  { path: 'mensagens', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
