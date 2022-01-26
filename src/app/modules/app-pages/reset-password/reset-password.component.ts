import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppMainComponent } from '../../../app-main/app-main.component';
import { AppComponent } from '../../../app.component';
import { ResetPasswordService } from '../../../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
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
  token: any = '';
  loginResult: any;
  howdoesthiswork: any;
  hasToken = false;
  form: any;

  constructor(
    private resetService: ResetPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private appMain: AppMainComponent,
    // public appState: AppStateService,
    public app: AppComponent
  ) {
    this.form = new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required],
      }),
      password2: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.isLoading = false;
    this.formIsLoading = false;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('token')) {
        this.token = paramMap.get('token');
        if (this.token !== '') {
          this.hasToken = true;
        }
      } else {
        this.hasToken = false;
      }
    });
  }

  async disableFormFields() {
    this.form.controls.password.disable();
    this.form.controls.password2.disable();
  }

  async enableFormFields() {
    this.form.controls.password.enable();
    this.form.controls.password2.enable();
  }

  async onProcessRegisterForm() {
    this.formSubmitted = true;
    this.disableFormFields();

    if (this.form.value.password.length < 6 || this.form.value.password2.length < 6) {
      this.passwordInvalid = true;
    } else {
      this.passwordInvalid = false;
    }

    if (this.form.invalid || this.passwordInvalid) {
      this.enableFormFields();
      return;
    }

    const res: any = await this.resetService.resetPasswordWithToken(this.form.value.password, this.token).toPromise();

    if (res.status === 'success') {
      this.showSuccess = true;
    } else {
      this.formSubmitted = false;
      this.enableFormFields();
      this.apiError = true;
      this.apiMessage = res.message;
    }
  }
}
