import { Component, OnInit, effect, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DataServiceService } from './data-service.service';
import { CardModule } from 'primeng/card';
import { LogoutComponent } from './logout/logout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, CardModule, LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataServiceService]
})
export class AppComponent implements OnInit{
  title = 'task-management-app';
  //showLink = signal(false);
  isLoggedIn$ : boolean = false;
  //isLoggedIn$  = this.dataService.isLoggedIn$;
  constructor(private location : Location,public dataService: DataServiceService){
    //this.isLoggedIn = this.dataService.isLoggedIn()
    
  }
  
  ngOnInit() {
    
    if(this.location.isCurrentPathEqualTo('/login')){
      console.log('current path - ',this.location.path);
      //this.isLoggedIn = this.dataService.isLoggedIn(); 
      console.log('logout - ',this.isLoggedIn$);
    }  
     
    
  }
  toggleLink(){
    //this.showLink.set(!this.showLink());
  }

}
