import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { ActivitylogsService } from '../activitylogs.service';

@Component({
  selector: 'app-view-activitylogs',
  templateUrl: './view-activitylogs.component.html',
  styleUrls: ['./view-activitylogs.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ViewActivitylogsComponent implements OnInit {
  activityLogId = 0;
  isLoading = true;
  activityLog?: any;
  s1?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public app: AppComponent,
    private activitylogsService: ActivitylogsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit() {
    this.s1 = this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.isLoading = true;
      this.activityLogId = Number(paramMap.get('id'));
      this.getItem();
    });
  }

  async getItem() {
    const r: any = await this.activitylogsService.get(this.activityLogId).toPromise();
    console.log('Stage', r);
    if (r.status === 'success') {
      this.activityLog = r.data;
      this.isLoading = false;
    } else {
      this.confirmationService.confirm({
        header: 'Error',
        icon: 'fa fa-check',
        message: 'Log Could Not Be Loaded!',
        accept: () => {
          // Actual logic to perform a confirmation
          this.router.navigate(['/stages']);
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
