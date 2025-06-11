import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

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
      }
    ]
  },
];
