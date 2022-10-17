import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { auditServices } from '../services/audit.service';
import { ConfirmedValidator } from '../confirmed.validator';
import { Examiner } from '../Model/examiners';

@Component({
  selector: 'app-createexaminer',
  templateUrl: './createexaminer.component.html',
  styleUrls: ['./createexaminer.component.less']
})
export class CreateexaminerComponent implements OnInit {

  // nameC:any;
  // usernameC:any;
  // passwordC:any;
  // passwordCC:any;
  addNewForm! : FormGroup;
  isValidFormSubmitted = false;
  examiners:Examiner[] = [];
  message:any;
  examiner : Examiner = {
    ExaminerId: 0,
    Name : '',
    Username : '',
    Password : '',
    HoursAssigned : 0,
    IsActive : true
  }

  constructor(private service: auditServices,public router:Router, private fb: FormBuilder) { 
    this.myForm();
  }

  ngOnInit(): void {
  }

  myForm() {
    debugger;
    this.isValidFormSubmitted = true;
     
     
    this.addNewForm = this.fb.group({
      name:['', Validators.required],
      username:['', [Validators.required, Validators.minLength(4)] ],
      PassWord:['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)] ],
      newPassWord:['',[Validators.required, Validators.minLength(5), Validators.maxLength(15)] ]
    }, { 

      validator: ConfirmedValidator('PassWord', 'newPassWord')

    });
    
    
 }

 OnSubmit()
 {
  if (this.addNewForm.invalid) {
    this.isValidFormSubmitted = false;
 }
 else
 {
  this.isValidFormSubmitted = true;
 }
 if(this.isValidFormSubmitted)
 {
  this.service.SaveExaminer(this.examiner).subscribe(
    response => { 
      this.message=response;
       alert(this.message.message); 
      //  this.clearControls();
      //  this.GetUserID();
      //  this.loadCategoryList();
      // window.location.reload();
       this.router.navigate([`${'examiner'}`]);
      // this.router.navigate(['/author']);     
  }
  );
 }

 }

}
