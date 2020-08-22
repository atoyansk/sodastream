import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { QaReportsComponent } from './qa-reports/qa-reports.component';
import { FailureReportsComponent } from './failure-reports/failure-reports.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'qa-reports', component: QaReportsComponent },
  { path: 'failure-reports', component: FailureReportsComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
