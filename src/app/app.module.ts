import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GoalsComponent } from './modules/goals/goals.component';
import { CityHallsComponent } from './modules/city-halls/city-halls.component';
import { SecretariesComponent } from './modules/secretaries/secretaries.component';
import { UsersComponent } from './modules/users/users.component';
import { AnnouncementsComponent } from './modules/announcements/announcements.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componets/header/header.component';
import { SidebarComponent } from './componets/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditCityHallComponent } from './modules/city-halls/edit-city-hall/edit-city-hall.component';
import { EditSecretaryComponent } from './modules/secretaries/edit-secretary/edit-secretary.component';
import { EditUserComponent } from './modules/users/edit-user/edit-user.component';


// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

// Banco Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GoalsComponent,
    CityHallsComponent,
    SecretariesComponent,
    UsersComponent,
    AnnouncementsComponent,
    MessagesComponent,
    HeaderComponent,
    SidebarComponent,
    EditCityHallComponent,
    EditSecretaryComponent,
    EditUserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }

