import { ResetPasswordService } from './../../../services/reset-password.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = true;
  user: any;
  loginSubmitted = false;
  passwordInvalid = false;
  emailInvalid = false;
  isLoggingIn = false;
  returnUrl = '';
  otherError = null;
  recaptchaValid = true;
  hideRecaptcha = true;
  formIsLoading = true;
  formSubmitted = false;
  resetPassword = false;
  apiError = false;
  apiMessage: any;
  showSuccess = false;
  linkSent = false;
  form: any;

  constructor(public resetService: ResetPasswordService, private router: Router, private route: ActivatedRoute, public app: AppComponent) {
    this.form = new FormGroup({
      customerEmail: new FormControl(' ', {
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  ngOnInit() {
    this.isLoading = false;
    this.formIsLoading = false;
  }

  async disableFormFields() {
    this.form.controls.customerEmail.disable();
  }

  async enableFormFields() {
    this.form.controls.customerEmail.enable();
  }

  async onProcessForgotForm() {
    this.disableFormFields();
    this.formSubmitted = true;

    if (this.form.invalid) {
      this.enableFormFields();
    } else {
      const res: any = await this.resetService.forgotPassword(this.form.value.customerEmail).toPromise();
      if (res) {
        this.enableFormFields();
      }
      this.linkSent = true;
    }
  }
}
