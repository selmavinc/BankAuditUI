import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { auditServices } from '../services/audit.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { DatePipe } from '@angular/common';

describe('Audit service', () => {
    let auditService: auditServices;
    let httpSpy:{ get: jasmine.Spy,post:jasmine.Spy, put:jasmine.Spy};
  
    beforeEach(async () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get','post','put'])
      await TestBed.configureTestingModule({
        providers:[
            DatePipe,
          auditServices,
          { provide: HttpClient, useValue:httpSpy}
        ],
      });
  
      auditService=TestBed.inject(auditServices);
    });
  
    it('audit service is created', () => {
      expect(auditService).toBeTruthy();
    });

    it('Lead examiners api success',fakeAsync(() => {
        
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
          httpSpy.get.and.returnValue(defer(() => Promise.resolve(ExaminerData)));
          auditService.GetLeadAssocExaminers().subscribe((data) => {
            //   console.log(data);
              expect(data).toEqual(ExaminerData);
          });
          tick();
    }));

    it('Login api success',fakeAsync(() => {
        
        const inputData=
            {
                userName:'abc',
                password:'123',
            };
          httpSpy.post.and.returnValue(defer(() => Promise.resolve(true)));
          auditService.Login(inputData).subscribe((data) => {
            //   console.log(data);
              expect(data).toBeTruthy();
          });
          tick();
    }));

    it('Examiner api success',fakeAsync(() => {
        debugger;
        const inputData=
            {
                ExaminerId:1,
                Username:'Mahesh',
                Password:'123',
                Name:'Mahesh',
                HoursAssigned:4,
                IsActive:true
            };
          httpSpy.post.and.returnValue(defer(() => Promise.resolve(true)));
          auditService.SaveExaminer(inputData).subscribe((data) => {
            //   console.log(data);
              expect(data).toBeTruthy();
          });
          tick();
    }));
    it('update audit api success',fakeAsync(() => {
        debugger;
        const inputData=
            {
                AuditId:1,
                BranchId:'A111',
                LeadExaminerId:7,
                AssociateExaminerId:4,
                AuditDate:new Date(),
                AuditHours:4,
                AuditStatusID:2
            };
          httpSpy.put.and.returnValue(defer(() => Promise.resolve(true)));
          auditService.UpdateAudit(inputData.AuditId,inputData.LeadExaminerId,inputData.AssociateExaminerId,inputData.AuditDate).subscribe((data) => {
            //   console.log(data);
              expect(data).toBeTruthy();
          });
          tick();
    }));
    it('enable/Disable api success',fakeAsync(() => {
        debugger;
        const testData=false;
        const inputData=
        {
            ExaminerId:1,
            Username:'Mahesh',
            Password:'123',
            Name:'Mahesh',
            HoursAssigned:4,
            IsActive:true
        };
          httpSpy.put.and.returnValue(defer(() => Promise.resolve(true)));
          auditService.EnableExaminer(inputData.ExaminerId,testData).subscribe((data) => {
              console.log(data);
              expect(data).toBeTruthy();
          });
          tick();
    }));
 
  });