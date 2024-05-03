import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTaskComponent {

  userList : any[] = ['member','member2'];
  //@Input() showFormPopup : boolean = false;
  @Output() showFormPopup = new EventEmitter<boolean>();
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
console.log("Task Created", this.taskForm);
this.showFormPopup.emit();
}
cancelEvent(){
  console.log("cancel clicked");
  this.showFormPopup.emit();
}
}
