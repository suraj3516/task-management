import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.scss'
})
export class UserTaskComponent implements OnInit{
  @Input() username : string | undefined;
  tasks : any[] = [];
  //username : any = '';
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    console.log("username - ",this.username);
    this.fetchUserTasks();
  }
  fetchUserTasks()
  {
    //this.username = username;
    const url : string = 'assets/taskData.json';
    this.http.get<any[]>(url).subscribe((response)=>{this.processData(response)});
    
  }
  processData(tasks : any){
    for(let task of tasks)
      {
        console.log(task.taskAssigned);
        if(task.taskAssigned == this.username)
          {
            this.tasks.push(task);
            console.log("task found");
          }
        
      }
      console.log(this.tasks);
  }
}
