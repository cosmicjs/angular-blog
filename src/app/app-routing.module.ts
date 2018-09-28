import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllblogsComponent } from './components/allblogs/allblogs.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';
import { UsersinglepostComponent } from './components/usersinglepost/usersinglepost.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service';


const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '',
        component: AllblogsComponent
      },
      
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      {
        path: 'singlepost',
        component: SinglepostComponent
      },
      {
        path: 'singlepost',
        component: SinglepostComponent
      },
      {
        path: 'dashboard/usersinglepost',
        component: UsersinglepostComponent
      },

]

@NgModule({
    imports: [
      // RouterModule.forRoot(appRoutes, { useHash: true }),
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }