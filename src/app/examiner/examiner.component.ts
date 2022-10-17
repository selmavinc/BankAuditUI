
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Examiner } from '../Model/examiners';
import { auditServices } from '../services/audit.service';
// import { Examiner } from "src/app/Model/examiners";

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.less']
})
export class ExaminerComponent implements OnInit {

  resResult: any;
  examiners :any;
  ExaminerID:any;
  message:any;

  constructor(private service: auditServices,public router:Router) { }

  ngOnInit(): void {
    this.loadExaminers();
  }

  loadExaminers(){
    this.service.GetExaminers().subscribe(
      response => {
        this.resResult = response;
         console.log(this.resResult);
        }
    );
    }

    refreshComponent(){
      
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
   }

    EnableClick(item:Examiner){
      this.examiners =item; 
      this.ExaminerID= this.examiners.examinerId;
    
      this.service.EnableExaminer(this.ExaminerID,false).subscribe(
        response => {
          debugger;
        console.log(response);
          this.message=response;
          debugger;
           alert(this.message.message); 
           this.refreshComponent();
        }
      );
      
      
  }
  
  DisableClick(item:Examiner){
    
    this.examiners =item; 
    this.ExaminerID= this.examiners.examinerId;
    
    this.service.EnableExaminer(this.ExaminerID,true).subscribe(
      response => {
        debugger;
        console.log(response);
        this.message=response;
        debugger;
         alert(this.message.message); 
         this.refreshComponent();
      }
    );
    
  }

}
