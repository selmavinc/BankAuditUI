import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { auditServices } from '../services/audit.service';
import { HeaderComponentComponent } from '../header-component/header-component.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  response :any;
  usernameC='';
  passwordC='';
  loginForm! : FormGroup;
  isValidFormSubmitted = false;

  constructor(private service: auditServices,public router:Router, private fb: FormBuilder) { 
    this.myForm();
  }

  myForm() {
  
    this.isValidFormSubmitted = true;
     
     
    this.loginForm = this.fb.group({
      UserName:['', Validators.required ],
      PassWord:['', Validators.required]
    });
    
    
 }

  ngOnInit(): void {
  }

  refreshGridInAnotherComponent(){
    this.service.notifyOther({refresh: true});
}

  login(){
  
    

    if (this.loginForm.invalid) {
      this.isValidFormSubmitted = false;
   }
   else
   {
    this.isValidFormSubmitted = true;
   }
   if(this.isValidFormSubmitted)
    {
    var val = {
      userName : this.usernameC,
      password : this.passwordC
    }
    this.service.Login(val).subscribe(
      response => { 
        debugger;
         this.response = response; 
        if(this.response.isAuthenticated ==true){
         

          localStorage.setItem('IsValid', this.response.isAuthenticated);
          //  let headerComponentObj = new HeaderComponentComponent();
          //  headerComponentObj.ngOnInit();
          
          this.refreshGridInAnotherComponent();

         
          // this.router.navigate([`${'userhome'}`]);
          this.router.navigate(['/userhome']); 
          // this.router.navigateByUrl('/userhome');
          // window.location.reload();
          // alert("Successfully logged in"); 
         
        } 
        else
        {
           alert("Incorrect Username and Pasword");
        }
      }
    )   
    
    }

  }

}
