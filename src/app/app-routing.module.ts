import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { loginGuard } from './Guard/login.guard';
import { AdminResidentsComponent } from './admin-residents/admin-residents.component';
import { AdminBedsComponent } from './admin-beds/admin-beds.component';
import { AdminRoomsComponent } from './admin-rooms/admin-rooms.component';
import { AdminComplaintsComponent } from './admin-complaints/admin-complaints.component';
import { ResidentRegistrationComponent } from './resident-registration/resident-registration.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Admin Dashboard with nested routes
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [loginGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: 'residents', component: AdminResidentsComponent, canActivate: [loginGuard], data: { expectedRole: 'admin' } },
      { path: 'beds', component: AdminBedsComponent, canActivate: [loginGuard], data: { expectedRole: 'admin' } },
      { path: 'rooms', component: AdminRoomsComponent, canActivate: [loginGuard], data: { expectedRole: 'admin' } },
      { path: 'complaints', component: AdminComplaintsComponent, canActivate: [loginGuard], data: { expectedRole: 'admin' } },
      { path: 'newResident', component: ResidentRegistrationComponent, canActivate: [loginGuard], data: { expectedRole: 'admin' } },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },  // Default to residents when admin-dashboard is accessed
    ]
  },

  // User Dashboard
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [loginGuard], data: { expectedRole: 'staying-person' } },

  // Wildcard route for invalid URLs
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
