import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  
  isLoggedIn : boolean = false;
  ngOnInit(): void {
    if(localStorage){
      if(localStorage.getItem('username')){
        this.isLoggedIn = true;
      }
    }
  }
}
