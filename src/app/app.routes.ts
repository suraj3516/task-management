import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
    },
    {
        path : 'login',
        component : LoginComponent,
    },
    {
        path : 'tasks',
        component : TasksComponent,
    },
    {
        path : 'dashboard',
        component : AdminDashboardComponent,
    }
];
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModules{}
