import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { SigninComponent } from './signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { auditServices } from './services/audit.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserhomeComponent } from './userhome/userhome.component';
import { ExaminerComponent } from './examiner/examiner.component';
import { CreateexaminerComponent } from './createexaminer/createexaminer.component';
import { UpdateauditComponent } from './updateaudit/updateaudit.component';
import {CustomDatePipe} from './custom.datepipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    SigninComponent,
    UserhomeComponent,
    ExaminerComponent,
    CreateexaminerComponent,
    UpdateauditComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    auditServices,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
