import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PrimengStuffModule } from './../primeng-stuff/primeng-stuff.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPagesComponent } from './app-pages.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, PrimengStuffModule, ThemeModule],
  exports: [LoginComponent, LogoutComponent, ForgotPasswordComponent, ResetPasswordComponent],
  declarations: [AppPagesComponent, LoginComponent, LogoutComponent, ForgotPasswordComponent, ResetPasswordComponent],
})
export class AppPagesModule {}
