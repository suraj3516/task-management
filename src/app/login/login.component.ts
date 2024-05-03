import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import {writeJsonFile} from 'write-json-file';




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
    ReactiveFormsModule, HttpClientModule, 
    RouterModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  userInfo: any[] = [];
  userJsonData : any[] = [];
  router: Router = new Router;
  constructor(private http: HttpClient){}
  //constructor(private router: Router){}
  ngOnInit(): void {
    
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
        this.fetchUserData();
        console.log(this.userInfo);
        console.log("user data return - ",this.userInfo.length);
        
        let user  = {
          id : this.userInfo.length + 1,
          username: this.reactiveForm.value.username,
          password : this.reactiveForm.value.password,
          rememberMe: this.reactiveForm.value.rememberMe
        };
        
        this.appendUserData(user);
        localStorage.setItem("username",user.username);
        this.goToTask(user.username);
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
  fetchUserData(){
    const url : string = 'assets/userData.json';
    this.http.get<any[]>(url).subscribe((response)=>{this.userInfo=response});
  }

  appendUserData(newData : any)
  {
    this.userJsonData = this.userInfo;
    this.userJsonData.push(newData);
    this.writeUserData();
  }
  writeUserData(){
    //writeJsonFile('assets/userData.json',this.userJsonData);
    this.http.put('assets/userData.json',this.userJsonData).subscribe({next: (response)=>{
      console.log('user written successfully', response);
    },error: error=>{console.log('Error writing json',error);}
    });
  }
}
