import { ComponentFixture, fakeAsync, TestBed, waitForAsync,tick } from '@angular/core/testing';
import { auditServices } from '../services/audit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { SigninComponent } from './signin.component';
import { DebugElement } from '@angular/core';
import { async, throwError } from 'rxjs';
class Page{
  get submitButton(){
    return this.fixture.nativeElement.querySelector('#btnsubmit');
  }
  get usernameInput(){
    return this.fixture.debugElement.nativeElement.querySelector('#usernameC');
  }
  get passwordInput(){
    return this.fixture.debugElement.nativeElement.querySelector('#passwordC');
  }
  // get errorMsg(){
  //   return this.fixture.debugElement.query(By.css('.error')).nativeElement;
  // }
  constructor(private fixture:ComponentFixture<SigninComponent>){}
  public updateValue(input:HTMLInputElement,value:string){
    input.value=value;
    input.dispatchEvent(new Event('input'));
  }
}


describe('SigninComponent', () => {
  //declarations
  let component: SigninComponent; 
  let auditserv: auditServices;
  let auditserviceSpy:{Login:jasmine.Spy};
  let router:Router;
  let routerSpy:{navigate:jasmine.Spy};
  let fixture: ComponentFixture<SigninComponent>;
  let debugEl:DebugElement;
  let page:Page;

  beforeEach(async () => {
    //create spy object to mock services and router
    // let service:auditServices;
    auditserviceSpy = jasmine.createSpyObj(auditServices, ['Login']); // servicename, method name in the .ts file this.service.Login(val).subscribe(
    routerSpy=jasmine.createSpyObj(Router,['navigate']);  //name in this.router.navigate(['/userhome']); 
    await TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      providers: [
        //declare spy's created
        {provide: auditServices,useValue: auditserviceSpy},
        {provide:Router,useValue:routerSpy},
        // auditServices
      ],
      imports: [
        // Router,
        BrowserModule,
        FormsModule,  // imported as we are using ngModel in all filed
        HttpClientTestingModule,
        ReactiveFormsModule
        // RouterTestingModule
        
      ]
    })
    .compileComponents();
    

    fixture = TestBed.createComponent(SigninComponent);   //creates instance of login component and returns fixture of type signincomponent
    component = fixture.componentInstance;  // Once we get access to fixture, we can assign componentInstance to signincomponent
    debugEl=fixture.debugElement;
    auditserv=TestBed.inject(auditServices);
    router=TestBed.inject(Router);  
    page=new Page(fixture); //repetitive code checking can be done
    fixture.detectChanges();  // called whenever need to execute ngOnInit method
  });

  it('service created', () => {
    expect(auditserv).toBeDefined();
  });

  it('Component created', () => {
    expect(component).toBeDefined();
  });
  it('Component truthy', () => {
    expect(component).toBeTruthy();
  });
  it('empty username',() => {
    
    expect(component.usernameC).toBe('');
    page.submitButton.click();
    fixture.detectChanges();
    expect(component.isValidFormSubmitted).toBeFalsy();
    // expect(page.errorMsg.textContent).toBe(component.isValidFormSubmitted);
  });
  it('empty password',() => {
    
    page.updateValue(page.usernameInput,'abc');
    expect(component.usernameC).toBe('abc');
    expect(component.passwordC).toBe('');
    page.submitButton.click();
    fixture.detectChanges();
    expect(component.isValidFormSubmitted).toBeFalsy();
    // expect(page.errorMsg.textContent).toBe(component.isValidFormSubmitted);
  });
  it('Valid Username', () => {
    // let user = component.loginForm.controls['user'];
    // user.setValue('Test@test.com');
    page.updateValue(page.usernameInput,'abc');
    expect(component.usernameC).toBe('abc');
    expect(component.isValidFormSubmitted).toBeTruthy();
    });
    it('Valid Password', () => {
      // let user = component.loginForm.controls['user'];
      // user.setValue('Test@test.com');
      page.updateValue(page.passwordInput,'123');
      expect(component.passwordC).toBe('123');
      expect(component.isValidFormSubmitted).toBeTruthy();
      });
  it('valid credentials',
      // waitForAsync(() => {
        fakeAsync(() => {
         fixture.detectChanges(); 
        spyOn(component,'login');
        page.updateValue(page.usernameInput,'abc');
        page.updateValue(page.passwordInput,'123');
        debugger;
        // component.login();
        (auditserv.Login as jasmine.Spy).and.returnValue(
          Promise.resolve(true)
        );
        // tick();
        
        
        component.login();
        tick();
        expect(component.login).toHaveBeenCalledTimes(1);
        page.submitButton.click();
        // // expect(component.login).toHaveBeenCalledTimes(0);
        // fixture.detectChanges(); 
        // //if login successfull
        fixture.whenStable().then(() => {  
          // fixture.detectChanges(); 
          // const errorArea = debugEl.query(By.css('.error'));
          // expect(errorArea).toBeNull();
          router.navigate(['userhome']);
          const navArgs = (router.navigate as jasmine.Spy).calls.first()
          .args[0];
          console.log(navArgs);
        expect(navArgs).toEqual(['userhome']);
      });
  }));

  it('Invalid credentials',
    fakeAsync(() => {
     fixture.detectChanges(); 
    spyOn(component,'login');
    
    page.updateValue(page.usernameInput,'abc');
    page.updateValue(page.passwordInput,'321');
    (auditserv.Login as jasmine.Spy).and.returnValue(
      Promise.resolve(false)
    );
    component.login();
    
    expect(component.login).toHaveBeenCalledTimes(1);
    page.submitButton.click();
    tick();
    fixture.detectChanges(); 
    expect(component.isValidFormSubmitted).toBeTruthy();
}));
it('Login Failed',
fakeAsync(() => {
 fixture.detectChanges(); 
spyOn(component,'login');

page.updateValue(page.usernameInput,'abc');
page.updateValue(page.passwordInput,'abc');
(auditserv.Login as jasmine.Spy).and.rejectWith(
  throwError(() => new Error('Login Failed'))
);
component.login();

expect(component.login).toHaveBeenCalledTimes(1);
page.submitButton.click();
tick();
fixture.detectChanges(); 
expect(component.isValidFormSubmitted).toBeTruthy();
}));
 });
