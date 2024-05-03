import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AccordionModule } from 'primeng/accordion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { UserTaskComponent } from '../user-task/user-task.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [LoginComponent, AccordionModule, 
    HttpClientModule, CommonModule, 
    UserTaskComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  userList : any[] = [];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList(){
    const url = '/assets/userData.json';
    this.http.get<any[]>(url).subscribe(response => this.userList=response);
  }

  fetchTasks(){
    
  }
}
