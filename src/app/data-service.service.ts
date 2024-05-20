import { HttpClient } from '@angular/common/http';
import { Injectable, effect, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import PocketBase from 'pocketbase';
import { Environment } from './environment';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private userList = new BehaviorSubject<any[]>([]);
  public userList$ = this.userList.asObservable();
  private taskList = new BehaviorSubject<any[]>([]);
  public taskList$ = this.taskList.asObservable();
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  //isLoggedIn = signal(false);
  
  constructor(private http : HttpClient) 
  { 
  }
  async getUser(){
    const url = Environment.baseUrl + 'api/collections/users/records';
    console.log(url);
    try{
    this.http.get<any[]>(url).pipe(map(data => {return data;})
  ).subscribe(data => {this.userList.next(data);});
  console.log('user list DS - ',this.userList$);
}catch(error){console.log('error occured')};

  }

  async getTask(){
    const url = Environment.baseUrl + 'api/collections/task/records';
    console.log(url);
    this.http.get<any[]>(url).pipe(map(data => {return data;})
  ).subscribe(data => {this.taskList.next(data);});
  console.log('task list DS - ',this.taskList$);
  }

  async createTask(body : any){
    const url = Environment.baseUrl + 'api/collections/task/records';
    console.log(url);

    this.http.post<any[]>(url,body).pipe(map(data => {return data;})
  ).subscribe(data => {this.taskList.next(data);});
  console.log('task list DS - ',this.taskList$);
  }
  setLoggedIn(status : boolean){
    this.isLoggedIn.next(status);
  }
}
