import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { auditServices } from '../services/audit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponentComponent } from './header-component.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector:'signin',
  template:'Signin Component',
})
class SigninComponent{}
@Component({
  selector:'userhome',
  template:'Userhome Component',
})
class UserhomeComponent{}
@Component({
  selector:'examiner',
  template:'Examiner Component',
})
class ExaminerComponent{}
@Component({
  selector:'createexaminer',
  template:'Createexaminer Component',
})
class CreateexaminerComponent{}
@Component({
  selector:'updateaudit',
  template:'updateaudit Component',
})
class UpdateauditComponent{}

describe('HeaderComponentComponent', () => {
  let component: HeaderComponentComponent;
  let fixture: ComponentFixture<HeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponentComponent,SigninComponent,UserhomeComponent,ExaminerComponent,CreateexaminerComponent,UpdateauditComponent ],
      providers: [
        auditServices
      ],
      imports: [
        // Router,
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {path: '', redirectTo:'/signin',pathMatch:'full'},
          {path: 'signin', component: SigninComponent},
          {path: 'userhome', component: UserhomeComponent},
          {path: 'examiner', component: ExaminerComponent},
          {path: 'createexaminer', component: CreateexaminerComponent},
          {path: 'updateaudit', component: UpdateauditComponent}
        ]),
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('routes are navigated', fakeAsync(() => {
    expect(component).toBeDefined();  //headercomponent defined
    const router=TestBed.inject(Router);  
    const location=TestBed.inject (Location);
    router.initialNavigation();//goes to initial route
    tick();
    expect(location.path()).toBe('/signin');
    // router.navigate(['userhome']);
    // tick();
    // expect(location.path()).toBe('/userhome');
  }));
});
