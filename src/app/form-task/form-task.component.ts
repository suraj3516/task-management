import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

interface taskBody{
  subject : string,
  description : string,
  status : string,
  assignedto : string
}
@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, 
    CommonModule, ButtonModule, InputTextModule, DropdownModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss',
  providers : [DataServiceService]
})
export class FormTaskComponent {
 private dataService = inject(DataServiceService);
  //List : any[] = ['member','member2','member3'];
  @Input() userList : string[]= [];
  @Output() showForm = new EventEmitter<boolean>(false);
taskForm : FormGroup = new FormGroup({
  taskSubject : new FormControl('',Validators.required),
  taskDescription : new FormControl('',Validators.required),
  taskAssigned : new FormControl('',Validators.required),
})
// cancel(){
// this.showFormPopup = false
// }
reset(){
  this.taskForm.reset;
}
createNewTask(){
  console.log("creating new task initiated!!!!!");
  console.log(this.taskForm);
  if(this.taskForm.status == "VALID")
    {
      console.log("form is valid!!!");
      const body : taskBody  = {
        subject : this.taskForm.value.taskSubject,
        description : this.taskForm.value.taskDescription,
        assignedto : (this.taskForm.value.assignedto == 'member')?'member@abc.com':'member2@abc.com',
        status : 'TO-DO'
      }
      console.log("Body Created", body);
      this.dataService.createTask(body);
    console.log("Task Created", this.taskForm);
    this.showForm.emit(false);
    }
  
}
cancelEvent(){
  console.log("cancel clicked");
  this.showForm.emit(false);
}
}
