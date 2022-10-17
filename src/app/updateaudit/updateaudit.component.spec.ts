import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
class UpdateauditComponentStub{
  GetLeadAssocExaminers(){
    return Promise.resolve(ExaminerData);
  }
}

describe('UpdateauditComponent', () => {
  let component: UpdateauditComponent;
  let fixture: ComponentFixture<UpdateauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateauditComponent ],
      providers: [
        auditServices
      ],
      imports: [
        // Router,
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
        
      ]
    }).overrideComponent(UpdateauditComponent,{
      set : {
        providers:[
          {
            provide: auditServices,
            useClass: UpdateauditComponentStub,
          },
          DatePipe
        ],
      },
    });
    // .compileComponents();

    fixture = TestBed.createComponent(UpdateauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('is created and data received', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(UpdateauditComponent).toBeDefined();
      expect(component.LeadExaminers).toEqual(ExaminerData);
    });
  }));
});
