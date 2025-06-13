import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {authGuard, authGuardChild} from './shared/guards/auth.guard';
import {AdminPanelComponent} from './components/dashboard/admin-panel/admin-panel.component';
import {adminGuard, adminGuardChild} from './shared/guards/admin.guard';
import {NewTaskComponent} from './components/tasks/new-task/new-task.component';
import {TasksComponent} from './components/tasks/tasks/tasks.component';
import {AdminTasksComponent} from './components/dashboard/admin-panel/admin-tasks/admin-tasks.component';
import {AdminUsersComponent} from './components/dashboard/admin-panel/admin-users/admin-users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path:'login',
        component: LoginComponent,
      },
      {
        path:'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path:'reset-password',
        component: ResetPasswordComponent,
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuardChild],
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
      },
    ]
  },
  {
    path: 'dashboard/tasks/new-task',
    component: NewTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [authGuard, adminGuard],
    canActivateChild: [authGuardChild, adminGuardChild],
    children: [
      {
        path: 'tasks',
        component: AdminTasksComponent
      },
      {
        path: 'users',
        component: AdminUsersComponent
      }
    ]
  }
];
