import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormTaskComponent } from '../form-task/form-task.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  showFormPopup = false;
  showCreateButton = true;
  tasks : any[] = [];
  usertasks : any[] = [];
  newtasks : any[] = [];
  username : any = '';
  userInfo : any[] = [];
  profile : any = '';
  isManager = false;

  constructor(private http: HttpClient){}
  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.fetchUserData();
    this.fetchTasks();    
    console.log("username - ",this.username);
    console.log("profile - ",this.profile);
    if(this.profile=="manager"){
      this.isManager = true;
    }
  }
  createTask(){
    this.showFormPopup = true;
    this.showCreateButton = false;
  
  }
   fetchTasks(){
    const url : string = 'assets/taskData.json';
   this.http.get<any[]>(url).subscribe((response)=>{this.processData(response)});
    console.log(this.tasks);
    };
    processData(tasks : any){
      for(let task of tasks)
        {
          console.log(task.taskAssigned);
          if(task.taskAssigned == this.username)
            {
              this.usertasks.push(task);
              console.log("task found");
            }
          
        }
        console.log(this.usertasks);
    }

    fetchUserData(){
      const url : string = 'assets/userData.json';
      this.http.get<any[]>(url).subscribe((response)=>{this.fetchProfile(response)});
    }
    fetchProfile(data: any){
      for(let user of data){
        console.log(user);
        if(this.username == user.username){
          console.log("profile found - ", user.profile)
          
          localStorage.setItem("profile",user.profile);
          this.profile = user.profile;
        }
      }
      if(this.profile=="manager"){
        this.isManager = true;
      }
    }
  appendTasks()
  {
    let newTask = {
      id : 3,
        taskSubject : "Create file",
        taskDescription : "Create a file in the main folder.",
        status : "To-Do",
        dateCreated : "05-01-2024",
        taskOwner : "manager01",
        taskAssigned : "member01"
    }
    this.newtasks = this.tasks;
    this.newtasks.push(newTask);

    this.writeTasks();
  }
  writeTasks(){

    this.http.put('assets/taskData.json',this.newtasks).subscribe({next: (response)=>{
      console.log('Tasks written successfully');
    },error: error=>{console.log('Error writing json',error);}
    });
  }

}
