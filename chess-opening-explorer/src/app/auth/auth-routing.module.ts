import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Form',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Form',
    },
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Your Profile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
