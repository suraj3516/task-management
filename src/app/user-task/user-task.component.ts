import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.scss',
  providers : [DataServiceService]
})
export class UserTaskComponent implements OnInit{
  @Input() username : string | undefined;
  tasks : any[] = [];
  usertasks : any = [];
  constructor(private dataService : DataServiceService){}
  ngOnInit(): void {
    console.log("username - ",this.username);
    this.dataService.getTask();
    this.dataService.taskList$.subscribe(data=>{this.processData(data)});
  }
  
  processData(tasks : any){
    for(let key in tasks)
      {
        if(key.toString() == 'items'){
          for(const task of tasks[key])
            {
              console.log(task);
              if(task.assignedto == this.username)
                {
                  this.usertasks.push(task);
                  console.log("task found");
                }
            }
          }
        
      }
      console.log('user tasks - ',this.usertasks);
  }
}
