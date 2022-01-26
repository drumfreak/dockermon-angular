import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from '../../../../app.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ViewUserComponent implements OnInit {
  userId: number = 0;
  isLoading = true;
  user?: any;
  s1?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public app: AppComponent,
    private userService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit() {
    this.s1 = this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.isLoading = true;
      this.userId = Number(paramMap.get('id'));
      this.getUser();
    });
  }

  async getUser() {
    const r: any = await this.userService.getUser(this.userId).toPromise();
    console.log('GetUserResult', r);
    if (r.status === 'success') {
      this.user = r.data;
      this.isLoading = false;
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
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}
