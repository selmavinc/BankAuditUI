import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { auditServices } from '../services/audit.service';
import { Audit } from '../Model/audits';
import { DatePipe } from '@angular/common';
import { ISelectVal } from '../interface';
import { timestamp } from 'rxjs';
// import {CustomDatePipe} from '../custom.datepipe';

@Component({
  selector: 'app-updateaudit',
  templateUrl: './updateaudit.component.html',
  styleUrls: ['./updateaudit.component.less']
})
export class UpdateauditComponent implements OnInit {
  updateNewForm! : FormGroup;
  response :any;
  auditID:any;
  leadExaminerID:any;
  associateExaminerID:any;
  auditDate: Date = new Date();
  isValidFormSubmitted = false;
  Auditexaminers:Audit[] = [];
  LeadExaminers:any[] =[];
  AuditsStatuses:any[] =[];
  AuditList:any[] =[];
  message:any;
  branchID:any;
  selectedValues: ISelectVal[] = [];
  selectedVal: ISelectVal = <ISelectVal>{}; // set all selected values
  auditexaminer : Audit = {
    auditId: 0,
    branchId:'',
    leadExaminerId:0,
    leadExaminerName : '',
    associateExaminerId:0,
    associateExaminerName:'',
    auditDate: new Date(),
    auditHours : 0,
    auditStatusId : 0,
    auditStatuses : ''
  }

  constructor(private service: auditServices,public router:Router,public ActiveRoute:ActivatedRoute, private fb: FormBuilder,public datepipe: DatePipe) { 
    this.myForm();
  }

  myForm() {
    
    this.isValidFormSubmitted = true;
     
     
    this.updateNewForm = this.fb.group({
      branch:[{value: '', disabled: true}, Validators.required],
      leadExaminer:['', Validators.required],
      assocExaminer:[{value: 0}, Validators.required],
      auditDate:['', Validators.required],
      audithour:[{value: 0, disabled: true}, Validators.required],
      status:[{value: '', disabled: true}, Validators.required]
    });
    
    
 }

 GetBranchID() {
  this.ActiveRoute.queryParams.subscribe(params => {
    this.branchID = params['branchId'];
  });
 }

  ngOnInit(): void {
    this.GetBranchID();
    
    this.loadLeadExaminers();
    this.loadassocExaminers();
    this.loadAudits();
    this.loadAuditStatus();
   
  }

  loadLeadExaminers() {
    this.service.GetLeadAssocExaminers()
    .subscribe(
      response => { 
       
        this.LeadExaminers = response;
      }
    );
  }

  loadassocExaminers() {
    this.selectedVal = <ISelectVal>{};
    this.service.GetLeadAssocExaminers()
    .subscribe(
      response => { 
        
        this.LeadExaminers = response;
        this.selectedVal.text = "--Select--";
          this.selectedVal.value = "0";
          this.selectedValues.push(this.selectedVal);
          // console.log(this.selectedValues);
        // this.LeadExaminers.forEach(element => {
        //   debugger;
        //   this.selectedVal.text = element.name;
        //   this.selectedVal.value = element.examinerId;
        //   this.selectedValues.push(this.selectedVal);
        //   console.log(this.selectedValues);

        // });
        this.LeadExaminers.forEach(element => {
         
          this.selectedVal.text = element.name;
          this.selectedVal.value = element.examinerId;
          this.selectedValues.push(this.selectedVal);
          // console.log(this.selectedValues);

        });
        
        
        
        
        
      }
    );
  }
  loadAudits() {
    
    // this.auditexaminer.associateExaminerId=0;
    this.service.GetAuditDetail(this.branchID)
    .subscribe(
      response => { 
        debugger;
        this.Auditexaminers = response;
        this.response=response;
        this.auditexaminer.auditId=this.response.auditId;
        this.auditexaminer.branchId=this.response.branchId;
        this.auditexaminer.leadExaminerId=this.response.leadExaminerId;
        this.loadLeadExaminers();
        console.log(this.LeadExaminers);
        for (const element of this.LeadExaminers) {
          if(this.response.leadExaminerName == element.name)
          {
            debugger;
            this.auditexaminer.leadExaminerId=this.response.leadExaminerId;
            break;

          }
          else
          {
            this.auditexaminer.leadExaminerId=null;
          }
          
        }
        for (const element of this.LeadExaminers) {
          if(this.response.associateExaminerName == element.name)
          {
            debugger;
            this.auditexaminer.associateExaminerId=this.response.associateExaminerId;
            break;

          }
          else
          {
            this.auditexaminer.associateExaminerId=null;
          }
          
        }
        // this.LeadExaminers.forEach(element => {
         
        //   debugger;
        //   console.log(this.response.leadExaminerName);
        //   console.log(element.name);
        //   if(this.response.leadExaminerName == element.name)
        //   {
        //     this.auditexaminer.leadExaminerId=this.response.leadExaminerId;
        //     return;

        //   }
        //   else
        //   {
        //     this.auditexaminer.leadExaminerId=null;
        //   }
          

        // });

        // this.LeadExaminers.forEach(element => {
        //  debugger;
        //  console.log(this.response.associateExaminerName);
        //  console.log(element.name);
        //   if(this.response.associateExaminerName == element.name)
        //   {
        //     this.auditexaminer.associateExaminerId=this.response.associateExaminerId;
        //     return;

        //   }
        //   else
        //   {
        //     this.auditexaminer.associateExaminerId=null;
        //   }
          

        // });
        // console.log(this.response.leadExaminerName);
        // console.log(this.response.associateExaminerName);
        // console.log(this.auditexaminer.leadExaminerName);
        // console.log(this.auditexaminer.associateExaminerName);
        // if(this.response.leadExaminerName != this.auditexaminer.leadExaminerName && this.auditexaminer.leadExaminerName == "")
        // {
        //   // if(this.auditexaminer.leadExaminerName == "")
        //       this.auditexaminer.leadExaminerId=null;
        // }
        // else
        // {
        //   this.auditexaminer.leadExaminerId=this.response.leadExaminerId;
        // }
        // if(this.response.associateExaminerName != this.auditexaminer.associateExaminerName && this.auditexaminer.associateExaminerName == "")
        // {
        //   // if(this.auditexaminer.associateExaminerName == "")
        //       this.auditexaminer.associateExaminerId=null;
        // }
        // else
        // {
        //   this.auditexaminer.associateExaminerId=this.response.associateExaminerId;
        // }
        // this.auditexaminer.associateExaminerId=this.response.associateExaminerId;
        
        console.log(this.auditexaminer.associateExaminerId);
        console.log(this.auditexaminer.leadExaminerId);
        // console.log(this.auditexaminer.leadExaminerName);
        // this.auditexaminer.auditDate=  this.datepic.transform(this.response.auditDate,'yyyy/MM/d');
        // this.auditexaminer.auditDate= new Date(this.response.auditDate);
        // this.auditexaminer.auditDate= new Date(this.response.auditDate).toLocaleDateString("en-us");
        this.updateNewForm.controls['auditDate'].setValue(this.datepipe.transform(this.response.auditDate, 'yyyy-MM-dd'));
        // this.auditexaminer.auditDate= new Date(this.response.auditDate);
        this.auditexaminer.auditHours=this.response.auditHours;
        this.auditexaminer.auditStatusId=this.response.auditStatusId;
      }
    );
  }
  loadAuditStatus() {
    this.service.GetAuditStatuses()
    .subscribe(
      response => { this.AuditsStatuses = response}
    );
  }

  onSelected(value:string): void {
    if(value=="0: null")
    {
      this.auditexaminer.leadExaminerId = null;
    }
    else
    {
      this.auditexaminer.leadExaminerId = Number.parseInt(value);

    }
	
	}

  onassocSelected(value:string): void {
    
    if(value=="0: null")
    {
      this.auditexaminer.associateExaminerId = null;
    }
    else
    {
      this.auditexaminer.associateExaminerId = Number.parseInt(value);

    }
		
	}

  onauditSelected(value:string): void {
		this.auditexaminer.auditStatusId = Number.parseInt(value);
	}

  OnUpdate()
  {
    debugger;
    this.auditID=this.auditexaminer.auditId;
    this.leadExaminerID=this.auditexaminer.leadExaminerId;
    this.associateExaminerID=this.auditexaminer.associateExaminerId==null?0:this.auditexaminer.associateExaminerId;
    this.auditDate=this.auditexaminer.auditDate;

    if (this.updateNewForm.invalid) {
      this.isValidFormSubmitted = false;
      if(this.auditexaminer.associateExaminerId==null && this.auditexaminer.leadExaminerId!=null)
      {
        this.isValidFormSubmitted = true;
      }
    }
    else
    {
      this.isValidFormSubmitted = true;
    }
    if(this.isValidFormSubmitted)
    {

      this.service.UpdateAudit(this.auditID,this.leadExaminerID,this.associateExaminerID,this.auditDate).subscribe(
        response => { 
          this.message=response;
          debugger;
           alert(this.message.message); 
          //  this.clearControls();
          //  this.GetUserID();
          //  this.loadCategoryList();
          // window.location.reload();
           this.router.navigate([`${'userhome'}`]);
          // this.router.navigate(['/author']);     
      }
      );

    }
  }

}
