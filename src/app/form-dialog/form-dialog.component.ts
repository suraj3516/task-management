import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormTaskComponent } from '../form-task/form-task.component';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, FormTaskComponent],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent {
  @Input() visible : boolean = false;
  display : boolean = false;

  showDialog(){
    this.display == true;
  }
  onClose(){
    this.display = false;
  }
}
