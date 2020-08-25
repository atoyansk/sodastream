import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { QaReportsComponent } from './qa-reports/qa-reports.component';
import { FailureReportsComponent } from './failure-reports/failure-reports.component';
import { ReportsComponent } from './reports/reports.component';
import { HeaderComponent } from './header/header.component';
import { EnginesComponent } from './engines/engines.component';
import { ValvesComponent } from './valves/valves.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './utils/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QaReportsComponent,
    FailureReportsComponent,
    ReportsComponent,
    HeaderComponent,
    EnginesComponent,
    ValvesComponent,
    RegisterUserComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgbModule
  ],
  providers: [AuthGuard, AuthService, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
