import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from '../../../../app.component';
import { RolesService } from '../../roles/roles.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ManageUserComponent implements OnInit {
  @Input() mode: any = 'create';
  @Input() userId = 0;
  user?: any;
  isLoading = true;
  formIsLoading = false;
  form: any;
  formSubmitted = false;
  formSubmitting = false;
  successFlag = false;
  errorFlag = false;
  errorMessage: any;
  roles: any = [];

  Roles: any = ['Admin', 'TeamLead'];

  constructor(
    public app: AppComponent,
    private userService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rolesService: RolesService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const r1: any = await this.rolesService.getRoles({ where: 1 }).toPromise();
    if (r1.status === 'success') {
      this.roles = r1.data;
    }
    if (this.mode === 'edit') {
      // Fetch the user.
      if (this.userId === 0) {
        return;
      }
      const r: any = await this.userService.getUser(this.userId).toPromise();
      console.log('GetUserResult', r);
      if (r.status === 'success') {
        this.user = r.data;
        this.setupForm();
      } else {
        this.confirmationService.confirm({
          header: 'Error',
          icon: 'fa fa-check',
          message: 'User Could Not Be Loaded!',
          accept: () => {
            // Actual logic to perform a confirmation
            this.router.navigate(['/admin/users']);
          },
        });
        return;
      }
    } else {
      this.setupForm();
    }
  }

  setupForm() {
    this.isLoading = true;
    // reset the form
    this.formSubmitted = false;
    this.errorFlag = false;
    this.successFlag = false;
    this.errorMessage = null;

    const a = this.mode === 'edit' ? true : false;

    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      userRole: new FormControl('', {
        validators: [Validators.required, Validators.min(1)],
      }),
      // loginAuthorized: new FormControl(0, {
      //   validators: [Validators.required, Validators.requiredTrue],
      // }),
    });

    if (this.mode === 'edit') {
      this.form.patchValue({ email: this.user?.email });
      this.form.patchValue({ firstName: this.user?.firstName });
      this.form.patchValue({ lastName: this.user?.lastName });
      this.form.patchValue({ userRole: this.user?.role?.id });
      this.form.patchValue({ password: 'nochange' });
    }
    this.isLoading = false;
  }

  async disableFormFields() {
    for (const key in this.form.value) {
      if (this.form.value.hasOwnProperty(key)) {
        this.form.controls[key].disable();
      }
    }
  }

  async enableFormFields() {
    // tslint:disable-next-line:forin
    for (const key in this.form.value) {
      this.form.controls[key].enable();
    }
  }

  showConfirmation(userId: number) {
    this.messageService.add({
      severity: 'success',
      sticky: true,
      summary: 'Success!',
      detail: 'User has been saved!',
    });

    this.confirmationService.confirm({
      header: 'Confirmation',
      icon: 'fa fa-check',
      message: 'User Saved! Would you like to view now?',
      accept: () => {
        // Actual logic to perform a confirmation
        this.router.navigate(['/admin/users/view', userId]);
      },
      reject: () => {
        this.setupForm();
        window.scrollTo(0, 0);
        this.isLoading = false;
      },
    });
  }

  async submitForm() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      console.log('Error', this.form.invalid);
      return;
    }

    this.disableFormFields();
    // console.log(this.form.value);
    const values = { ...this.form.value };

    if (this.mode === 'create') {
      // Handle creating a user.
      const r: any = await this.userService.createUser({ user: values }).toPromise();
      console.log('Post Results', r);
      if (r.status === 'success') {
        this.successFlag = true;
        this.showConfirmation(r.data.id);
        this.enableFormFields();
      } else {
        this.errorFlag = true;
        this.errorMessage = r.message;
        this.enableFormFields();
        this.messageService.add({
          key: 'a',
          severity: 'error',
          sticky: true,
          summary: 'Error!',
          detail: 'Error Saving User',
        });
      }
    } else {
      // Handle updating a user.
      values.id = this.user.id;
      if (values.password === 'nochange') {
        delete values.password;
      }

      const r: any = await this.userService.updateUser({ user: values }).toPromise();
      if (r.status === 'success') {
        this.successFlag = true;
        this.showConfirmation(r.data.id);
        this.enableFormFields();
      } else {
        this.errorFlag = true;
        this.errorMessage = r.message;
        this.enableFormFields();
      }
    }
  }
}
