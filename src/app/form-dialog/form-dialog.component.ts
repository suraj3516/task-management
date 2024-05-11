import { Component, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormTaskComponent } from '../form-task/form-task.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, FormTaskComponent],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent {
  @Input() display : boolean = false;
  @Input() usersList : string[] = [];
  @Output() dialogClosed = new EventEmitter<boolean>();
  //display : boolean = false;
  onClose(){
    this.display = false;
    this.dialogClosed.emit(false);
  }
  closeDialog(){
    this.dialogClosed.emit(false);
  }
}
