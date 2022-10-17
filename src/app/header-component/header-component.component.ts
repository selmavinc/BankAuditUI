import { Component, OnInit } from '@angular/core';
import { auditServices } from '../services/audit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.less']
})
export class HeaderComponentComponent implements OnInit {

  showSignInSignUp : boolean = true;
  userLoggedIn :boolean =true;

  constructor(private service: auditServices,public router:Router) { }

  ngOnInit(): void {
    
    this.service.notifyObservable$.subscribe(res => {
      if(res.refresh){
          // get your grid data again. Grid will refresh automatically
          // this.service.getData();
          debugger;
          let values1 = JSON.parse(localStorage.getItem("IsValid") || '');
          console.log(values1);
          if(values1 ==true)
          {
            this.isUserLoggedIn(true);
          }
          else
          {
            this.isUserLoggedIn(false);
          }
      }
})
  }

  signOutClick() {
    this.isUserLoggedIn(false);
    this.router.navigate(['/signin']);        
  } 

  isUserLoggedIn(loggedIn:boolean){
    if(loggedIn){
      this.showSignInSignUp =false;
    }
    else{
      this.showSignInSignUp =true;
    }
    console.log("showSignInSignUp =" + this.showSignInSignUp);
    console.log("loggedIn =" + loggedIn);
  }

}
