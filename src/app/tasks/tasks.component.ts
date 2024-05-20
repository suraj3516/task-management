import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormTaskComponent } from '../form-task/form-task.component';
import { TableModule } from 'primeng/table';
import { DataServiceService } from '../data-service.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { UserTaskComponent } from '../user-task/user-task.component';
import { AppComponent } from '../app.component';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormTaskComponent, 
    TableModule, DialogModule, ButtonModule, 
    InputTextModule,FormDialogComponent, UserTaskComponent,
  DragDropModule, CardModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  providers: [DataServiceService]
})
export class TasksComponent implements OnInit{
  //visible : boolean = false;
  //showCreateButton = true;
  toDoTaskList : any[] | undefined | null = [] ;
  inProgressTaskList : any[] | undefined | null = [];
  doneTaskList : any[] | undefined | null= [];
  draggedTask: any | undefined | null;
  draggedTaskName : string | null | undefined;

  showFormPopup :boolean = false;
  tasks : any[] = [];
  usertasks : any[] = [];
  newtasks : any[] = [];
  username : any = '';
  userInfo : any[] = [];
  profile : any = '';
  isManager = false;
  cols = ['Id','Subject','Description','Status'];
  
  list : string[]= ['memeber','member2','member3'];
  constructor(private dataService : DataServiceService, private cdRef:ChangeDetectorRef){}
  ngOnInit(): void {
    
    
    this.cdRef.detectChanges();
    console.log('logout - ',this.dataService.isLoggedIn$);
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
  handleEvent(event : boolean){
    this.showFormPopup = event;
  }
  showForm(){
    //this.visible = true;
    this.showFormPopup = true;
    console.log('visible - ',this.showFormPopup);
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
        this.taskseparation(this.usertasks);
    }

    taskseparation(tasks : any){
      for(const task of tasks){
        console.log('tas status - ',task.status);
        if(task.status == 'TO-DO'){
          this.toDoTaskList?.push(task);
        }
        else if(task.status == 'Working'){
          this.inProgressTaskList?.push(task);
        }
        else{
          this.doneTaskList?.push(task);
        }
      }
      console.log('to-do task - ',this.toDoTaskList);
      console.log('Working task - ',this.inProgressTaskList);
      console.log('Done task - ',this.doneTaskList);
    }

    dragStart(task: any, name : string) {
      
      this.draggedTask = task;
      this.draggedTaskName = name;
      console.log('dragged task - ',this.draggedTask);
  }

  drop(status : string) {
    console.log('inside drop');
    if(status=='to-do'){
      if (this.draggedTask) {
        if(this.draggedTaskName == 'working'){
          this.draggedTask.status = 'TO-DO';
          this.processWorkingDrop();
          this.toDoTaskList?.push(this.draggedTask);
          this.draggedTask = null;
        }
        else if(this.draggedTaskName == 'done'){
          this.draggedTask.status = 'TO-DO';
          this.processDoneDrop();
          this.toDoTaskList?.push(this.draggedTask);
          this.draggedTask = null;
        }       
      }
    }
    else if(status=='working'){
      if (this.draggedTask) {
        if(this.draggedTaskName == 'to-do'){
          this.draggedTask.status = 'Working';
          this.processToDoDrop();
          this.inProgressTaskList?.push(this.draggedTask);
          this.draggedTask = null;
        }
        else if(this.draggedTaskName == 'done'){
          this.draggedTask.status = 'Working';
          this.processDoneDrop();
          this.inProgressTaskList?.push(this.draggedTask);
          this.draggedTask = null;
        }
        
        
      }
    }
    else {
      if (this.draggedTask) {
        if(this.draggedTaskName == 'to-do'){
          this.draggedTask.status = 'Completed';
          this.processToDoDrop();
          this.doneTaskList?.push(this.draggedTask);
          this.draggedTask = null;
        }
        else if(this.draggedTaskName == 'working'){
          this.draggedTask.status = 'Completed';
          this.processWorkingDrop();
          this.doneTaskList?.push(this.draggedTask);
          this.draggedTask = null;
        }
        
      }
    }
      
    
    
}

processToDoDrop(){
  let draggedTaskIndex = this.toDoTaskList?.findIndex((task) => task ==this.draggedTask);// this.findIndex(this.draggedTask);
  console.log('dragged task index - ',draggedTaskIndex);
  this.toDoTaskList = this.toDoTaskList?.filter((val,i) => i!=draggedTaskIndex);
  console.log('to-do task updated list - ',this.toDoTaskList);
}

processWorkingDrop(){
  let draggedTaskIndex = this.inProgressTaskList?.findIndex((task) => task ==this.draggedTask);// this.findIndex(this.draggedTask);
  console.log('dragged task index - ',draggedTaskIndex);
  this.inProgressTaskList = this.inProgressTaskList?.filter((val,i) => i!=draggedTaskIndex);
  console.log('inProgress task updated list - ',this.inProgressTaskList);
}

processDoneDrop(){
  let draggedTaskIndex = this.doneTaskList?.findIndex((task) => task ==this.draggedTask);// this.findIndex(this.draggedTask);
  console.log('dragged task index - ',draggedTaskIndex);
  this.doneTaskList = this.doneTaskList?.filter((val,i) => i!=draggedTaskIndex);
  console.log('done task updated list - ',this.doneTaskList);
}

dragEnd() {
  
  this.draggedTask = null;
  console.log('dragged task - ',this.draggedTask);
}

// findIndex(product: any) {
//   let index = -1;
//   for (let i = 0; i < (this.toDoTaskList as any[]).length; i++) {
//       if (product.id === (this.toDoTaskList as any[])[i].id) {
//           index = i;
//           break;
//       }
//   }
//   return index;
// }
}
