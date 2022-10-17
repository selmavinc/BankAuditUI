import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ExaminerComponent } from './examiner/examiner.component';
import { CreateexaminerComponent } from './createexaminer/createexaminer.component';
import { UpdateauditComponent } from './updateaudit/updateaudit.component';

const routes: Routes = [
  {path: '', redirectTo:'/signin',pathMatch:'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'userhome', component: UserhomeComponent},
  {path: 'examiner', component: ExaminerComponent},
  {path: 'createexaminer', component: CreateexaminerComponent},
  {path: 'updateaudit', component: UpdateauditComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
