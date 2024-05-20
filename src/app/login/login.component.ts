import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DataServiceService } from '../data-service.service';




interface Login{
  username : string;
  password : string;
  rememberMe : boolean;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, 
    CommonModule, FormsModule, 
    ReactiveFormsModule, 
    RouterModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [DataServiceService]
})
export class LoginComponent implements OnInit{
  @Output() isLoggedIn = new EventEmitter<boolean>(false);
  userList: any[] = [];
  userJsonData : any[] = [];
  router: Router = new Router;
  constructor(private dataService : DataServiceService, private cdRef: ChangeDetectorRef){}
  ngOnInit(): void {
    this.cdRef.detectChanges();
    this.dataService.getUser();
    this.dataService.userList$.subscribe(data=>{this.assignUserList(data);});
    console.log('user List - ',this.userList);
    //localStorage.clear();
  }
  assignUserList(data : any){
    this.userList = data;
  }
  //Template Driven Form
  // templateForm: Login ={
  //   username: '',
  //   password: '',
  //   rememberMe: false,
  // };
  // submitTemplate(){
  //   console.log(this.templateForm);
  // }
  //Reactive Form
  reactiveForm: FormGroup = new FormGroup({
    username : new FormControl('',[Validators.email,Validators.required]),
    password : new FormControl('',[Validators.required]),
    rememberMe : new FormControl(false,[])

  });
   submitReactive(){
    console.log(this.reactiveForm);
    if(this.reactiveForm.status == "VALID")
      {
        console.log(this.userList);
        console.log("user data return - ",this.userList);
        let userInput  = {
          username: this.reactiveForm.value.username,
          password : this.reactiveForm.value.password,
          rememberMe: this.reactiveForm.value.rememberMe
        };
        for(const user in this.userList){
          if(user.toString() == 'items'){
            console.log('item found - ',this.userList[user]);
            for(let u of this.userList[user]){
              console.log('username fetched - ',u.email);
              if(u.email == userInput.username ){
                localStorage.setItem("username",u.email);
                localStorage.setItem("profile",u.profile);
                this.isLoggedIn.emit(true);
                this.dataService.setLoggedIn(true);
                this.cdRef.detectChanges();
                console.log('logout - ',this.isLoggedIn);
                this.goToTask(u.email);
                
              }
            }
          }
          
        }
        console.log('usernme or password not matched');
        
        
      }
    
  }

  goToTask(username : string)
  {
    if(username == "admin@abc.com"){
      this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(['tasks']);
    }
    
  }
  

  
  
}
