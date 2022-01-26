import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app-main/app.breadcrumb.service';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css'],
})
export class AppDashboardComponent implements OnInit {
  isLoading = true;

  constructor(private breadcrumbService: AppBreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.setItems([{ label: 'Dashboard' }]);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
