import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auditServices } from '../services/audit.service';
import { Audit } from "src/app/Model/audits";

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.less']
})
export class UserhomeComponent implements OnInit {

  resResult: any;
  audits :any;
  AuditID:any;
  BranchID:any;

  constructor(private service: auditServices,public router:Router) { }

  ngOnInit(): void {
    this.loadAudits();
  }

  loadAudits(){
    this.service.GetAudits().subscribe(
      response => {
        this.resResult = response;
        debugger;
         console.log(this.resResult);
        }
    );
    }

    EnableClick(item:Audit){
    
      this.audits =item; 
      this.AuditID= this.audits.auditId;
      this.BranchID= this.audits.branchId;
      debugger;
      this.router.navigate([`${'updateaudit'}`],{ queryParams: { branchId: this.BranchID }});
    
      
      
      
  }

}
