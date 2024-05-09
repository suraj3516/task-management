import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormTaskComponent } from '../form-task/form-task.component';
import { TableModule } from 'primeng/table';
import { DataServiceService } from '../data-service.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormTaskComponent, 
    TableModule, DialogModule, ButtonModule, 
    InputTextModule,FormDialogComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  providers: [DataServiceService]
})
export class TasksComponent implements OnInit{
  visible : boolean = false;
  //showCreateButton = true;
  showFormPopup = false;
  tasks : any[] = [];
  usertasks : any[] = [];
  newtasks : any[] = [];
  username : any = '';
  userInfo : any[] = [];
  profile : any = '';
  isManager = false;
  cols = ['Id','Subject','Description','Status'];
  

  constructor(private dataService : DataServiceService){}
  ngOnInit(): void {
    console.log('task screen initiated');
    this.username = localStorage.getItem("username");
    this.profile = localStorage.getItem("profile");
    
    this.dataService.getTask();
    this.dataService.taskList$.subscribe(data=>{this.processData(data)});
    
    
    console.log('task list -  ',this.tasks);   
    console.log("username - ",this.username);
    console.log("profile - ",this.profile);
    if(this.profile=="manager"){
      this.isManager = true;
    }
    //this.processData(this.tasks);
    
  }
  showForm(){
    this.visible = true;
    console.log('visible - ',this.visible);
    //this.showCreateButton = false;
  
  }
  createTask(){
    this.showFormPopup = true;
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
        console.log(this.usertasks);
    }

}
