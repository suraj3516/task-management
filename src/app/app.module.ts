import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DataServiceService } from './data-service.service';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [],
  imports: [
     CommonModule, HttpClientModule, BrowserModule
  ],
  providers: [DataServiceService],
  bootstrap : []
})
export class AppModule { }
