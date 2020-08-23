import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { QaReportsComponent } from './qa-reports/qa-reports.component';
import { FailureReportsComponent } from './failure-reports/failure-reports.component';
import { ReportsComponent } from './reports/reports.component';
import { EnginesComponent } from './engines/engines.component';

import { AuthGuard } from './utils/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password',        component: ForgotPasswordComponent },
  { path: 'register-user',          component: RegisterUserComponent, canActivate: [AuthGuard] },
  { path: 'qa-reports', component: QaReportsComponent, canActivate: [AuthGuard] },
  { path: 'failure-reports', component: FailureReportsComponent, canActivate: [AuthGuard] },
  { path: 'engines', component: EnginesComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
