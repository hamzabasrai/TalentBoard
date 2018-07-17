import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/auth.guard';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'app', component: NavBarComponent, canActivate: [AuthGuard]}
];
