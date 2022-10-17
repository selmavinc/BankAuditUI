import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { Examiner } from '../Model/examiners';


@Injectable({
    providedIn: 'root'
  })
export class auditServices {

    baseUrl = 'https://localhost:44325/';
    
    constructor(private https: HttpClient,public router:Router) {}

    public notify = new BehaviorSubject<any>('');

    notifyObservable$ = this.notify.asObservable();

        public notifyOther(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
    // Login WebAPI
    Login(val:any):Observable<any[]>{
        return this.https.post<any>(this.baseUrl + "validate",val)
    }

    // View Audits
    GetAudits():Observable<any[]>{
        return this.https.get<any>(this.baseUrl +"api/Audits/getAudits");
    }

    // View Audit Statuses
    GetAuditStatuses():Observable<any[]>{
        return this.https.get<any>(this.baseUrl +"api/Audits/getAuditStatuses");
    }

    // View Examiners
    GetExaminers():Observable<any[]>{
        return this.https.get<any>(this.baseUrl +"api/Examiner/getExaminer");
    }

    // View Lead and Associate Examiners
    GetLeadAssocExaminers():Observable<any[]>{
        return this.https.get<any>(this.baseUrl +"api/Examiner/getLeadAssociateExaminer");
    }

    // Enable Examiner
    EnableExaminer(id: number, activity: boolean ):Observable<any[]>{
        return this.https.put<any>(this.baseUrl +"api/Examiner/EnableOrDisableExaminer/"+ id +"/"+activity,"");
    }

    SaveExaminer(examiner : Examiner):Observable<Examiner>{
        return this.https.post<Examiner>(this.baseUrl + "api/Examiner/AddExaminer",examiner);
    }

    // View Audit by Branch ID
    GetAuditDetail(BranchId: string):Observable<any[]>{
        return this.https.get<any>(this.baseUrl +"api/Audits/getAuditDetailByBranch/"+ BranchId);
    }

     // Update audit
     UpdateAudit(id: number, examinerId: number,associateId:number,auditDate:Date ):Observable<any[]>{
        
        return this.https.put<any>(this.baseUrl +"api/Audits/updateAudit/"+ id +"/"+examinerId +"/"+associateId +"/"+auditDate,"");
    }


}