import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuardGuard } from './auth-guard.guard';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
        
    },
    {
        path : 'login',
        component : LoginComponent,
    },
    {
        path : 'tasks',
        canActivate : [authGuardGuard],
        component : TasksComponent,
    },
    {
        path : 'dashboard',
        canActivate : [authGuardGuard],
        component : AdminDashboardComponent,
    },
    {
        path : 'dialog',
        component : FormDialogComponent
    }
];
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModules{}
