import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AppBreadcrumbService } from './app.breadcrumb.service';
import { Subject, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app.breadcrumb.component.html',
})
export class AppBreadcrumbComponent implements OnDestroy, AfterViewInit {
  destroy$: Subject<void> = new Subject();
  items: MenuItem[] = [];
  home: MenuItem;
  isLoading = true;

  constructor(public breadcrumbService: AppBreadcrumbService) {
    this.home = { icon: 'fa fa-home', routerLink: '/' };
  }

  ngAfterViewInit() {
    this.breadcrumbService.itemsHandler.subscribe((response) => {
      setTimeout(() => {
        this.items = [...response];
        // this.isLoading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
