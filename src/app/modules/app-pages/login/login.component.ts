import { AppComponent } from '../../../app.component';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, AfterViewInit {
  // @ViewChild('outer') outer: ElementRef<HTMLElement>;
  @ViewChild('emailInput') emailInput?: ElementRef;

  isLoading = true;
  user: any;
  formIsLoading = false;
  loginSubmitted = false;
  passwordInvalid = false;
  emailInvalid = false;
  isLoggingIn = false;
  returnUrl = '';
  otherError = null;
  recaptchaValid = true;
  hideRecaptcha = true;
  form: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public app: AppComponent
  ) {
    this.form = new FormGroup({
      email: new FormControl(' ', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
      // loginAuthorized: new FormControl(0, {
      //   validators: [Validators.required, Validators.requiredTrue],
      // }),
    });
  }

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    };
    this.returnUrl = this.route.snapshot.queryParams.ref || null;
    setTimeout(() => {
      this.setupForm();
    }, 600);
  }

  setupForm() {
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    if (this.emailInput) {
      // this.source = fromEvent(this.searchInput.nativeElement, 'keyup.enter');
      // this.source.pipe(debounceTime(200)).subscribe((c: any) => {
      //   // list = list.filter(item => item.label.toLocaleLowerCase().includes(this.searchedKPI.toLocaleLowerCase())).slice();
      //   console.log('I will search for ', this.searchTerm);
      // });
      this.emailInput.nativeElement.focus();
    }
  }

  async attemptLogin() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'error',
        life: 3000,
        summary: 'Invalid Login',
        detail: 'Please Try Again',
      });
      return;
    }
    this.isLoading = true;
    this.loginSubmitted = true;
    this.isLoggingIn = true;
    this.user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    const response = await this.loginService.doLogin(this.user).toPromise();
    this.isLoggingIn = false;
    console.log('Login response', response);
    // handle errors
    if (response.status === 'fail') {
      this.isLoading = false;
      if (response.message === 'credentials failed') {
        this.messageService.add({
          severity: 'error',
          life: 3000,
          summary: 'Invalid Login',
          detail: 'Please Try Again. Reason: ' + response.message,
        });
        // handle unknown error
      } else {
        this.otherError = response.message;
        this.messageService.add({
          severity: 'error',
          life: 3000,
          summary: 'Unknown Error',
          detail: 'Please Try Again. Reason: ' + response.message,
        });
        return;
      }
    }
    // console.log('Response', response);
    if (response.status === 'success') {
      // this.loginService.persistLogin(response);
      localStorage.setItem('token', response.token);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + response.tokenExpires);
      localStorage.setItem('tokenExpires', expirationDate.toISOString());
      this.app.setLoggedinUser(response.user);
      // console.log('Login response', this.app.user);
      // await this.app.doUpdateUser(this.app.user);
      // await this.appMain.doUpdateUser();
      // await this.appMain.login();
      // console.log('Got response from AppMain');
      // this.socketIoService.loginNotify(response.customer);
      this.checking();
    }
  }

  // if instructor only then redirect to calendar
  async checking() {
    // console.log('this.isInstructor:', isInstructor);
    let returnRoute = '/';
    let params: any = localStorage.getItem('queryParams');
    if (params) {
      params = JSON.parse(params);
      returnRoute = params.oldRoute ? params.oldRoute : returnRoute;
      returnRoute = returnRoute === '/login' ? '/' : returnRoute; // mind fuck.
      // console.log('Got query params from localStorage', params);
      // console.log('Got returnRoute from queryParams', returnRoute);
      this.router.navigate([returnRoute], {
        queryParams: params,
      }); // No wonder why this redirected to infinity on user roles.
    } else {
      this.router.navigate([returnRoute]); // No wonder why this redirected to infinity on user roles.
    }
  }

  initRecaptcha() {
    // console.log('Init recaptcha');
  }

  async recaptchaResponse(event: any) {
    this.recaptchaValid = true;
    // console.log('Captcha', event);
    let r: any = await this.loginService.verifyReCaptcha(event.response).toPromise();
    // console.log('Backend Recaptcha Response', r);
    if (r.status === 'success') {
      this.recaptchaValid = true;
    } else {
      this.recaptchaValid = true; // TODO: Fix the backend API key.
    }
  }

  recaptchaExpire() {
    // console.log('Recaptcha Expired');
    this.recaptchaValid = false;
  }
}
