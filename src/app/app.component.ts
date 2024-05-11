import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DataServiceService } from './data-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataServiceService]
})
export class AppComponent implements OnInit{
  title = 'task-management-app';
  showLink = signal(false);
  isLoggedIn : boolean = false;
  constructor(private location : Location,public dataService: DataServiceService){
    this.isLoggedIn = this.dataService.isLoggedIn()
  }
  
  ngOnInit() {
    if(this.location.isCurrentPathEqualTo('/login')){
      console.log('current path - ',this.location.path);
      
    }  
    this.isLoggedIn = this.dataService.isLoggedIn();  
    
  }
  toggleLink(){
    this.showLink.set(!this.showLink());
  }

}
