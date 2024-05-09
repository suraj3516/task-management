import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'task-management-app';
  isLoggedIn : boolean = true;
  constructor(private location : Location){}
  ngOnInit() {
    if(this.location.isCurrentPathEqualTo('/login')){false
      console.log('current path - ',this.location.path);
      this.isLoggedIn = false;
    }    
    
  }

}
