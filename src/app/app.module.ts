import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './Services/login-service.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminResidentsComponent } from './admin-residents/admin-residents.component';
import { AdminBedsComponent } from './admin-beds/admin-beds.component';
import { AdminRoomsComponent } from './admin-rooms/admin-rooms.component';
import { AdminComplaintsComponent } from './admin-complaints/admin-complaints.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AdminRequestsService } from './Services/admin-requests.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResidentRegistrationComponent } from './resident-registration/resident-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AdminResidentsComponent,
    AdminBedsComponent,
    AdminRoomsComponent,
    AdminComplaintsComponent,
    AdminNavbarComponent,
    ResidentRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule
  ],
  providers: [LoginServiceService, provideAnimationsAsync(),AdminRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
