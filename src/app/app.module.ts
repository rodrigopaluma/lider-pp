import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


/* import { getAnalytics } from "firebase/analytics";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAYjrhvrcMVupjwN4cAEQLYfkkKz7xLnQ8',
  authDomain: 'lider-politicas-publicas.firebaseapp.com',
  databaseURL: 'https://lider-politicas-publicas-default-rtdb.firebaseio.com',
  projectId: 'lider-politicas-publicas',
  storageBucket: 'lider-politicas-publicas.appspot.com',
  messagingSenderId: '912404874834',
  appId: '1:912404874834:web:6b074ce782b1061d94018b',
  measurementId: 'G-FRK3YDN1SQ',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GoalsComponent,
    CityHallsComponent,
    SecretariesComponent,
    UsersComponent,
    AnnouncementsComponent,
    MessagesComponent,
    HeaderComponent,
    SidebarComponent
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
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }

