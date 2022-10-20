import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { auditServices } from '../services/audit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UpdateauditComponent } from './updateaudit.component';
import { DatePipe } from '@angular/common';
const ExaminerData=[
  {
    examinerId:1,
    name:'Mahesh',
  },
  {
    examinerId:2,
    name:'Deepa',
  },
];
// class UpdateauditComponentStub{
//   GetLeadAssocExaminers(){
//     debugger;
//     return Promise.resolve(ExaminerData);
//   }
// }

describe('UpdateauditComponent', () => {
  let component: UpdateauditComponent;
  let fixture: ComponentFixture<UpdateauditComponent>;
  let auditserv: auditServices;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateauditComponent ],
      providers:[
        // {
        //   provide: auditServices,
        //   useClass: UpdateauditComponentStub,
        // },
        auditServices,
        DatePipe
      ],
      imports: [
        // Router,
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
        
      ]
    })
    // .overrideComponent(UpdateauditComponent,{
    //   set : {
    //     providers:[
    //       {
    //         provide: auditServices,
    //         useClass: UpdateauditComponentStub,
    //       },
    //       DatePipe
    //     ],
    //   },
    // });
    .compileComponents();

    fixture = TestBed.createComponent(UpdateauditComponent);
    component = fixture.componentInstance;
    auditserv=TestBed.inject(auditServices);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('is created and data received', fakeAsync(() => {
    debugger;
    fixture.detectChanges();
    spyOn(component,'loadLeadExaminers');
    // (auditserv.GetLeadAssocExaminers as jasmine.Spy).and.returnValue(
    //   Promise.resolve(true)
    // );
    auditserv.GetLeadAssocExaminers().subscribe((data) => {
      //   console.log(data);
        expect(data).toEqual(ExaminerData);
    });
    component.loadLeadExaminers();
    tick();
    
    expect(component.loadLeadExaminers).toHaveBeenCalledTimes(1);
    
    fixture.whenStable().then(() => {
      debugger;
      expect(UpdateauditComponent).toBeDefined();
      // expect(component.LeadExaminers).toEqual(ExaminerData);
    });
  }));
});
