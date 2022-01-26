import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AppBreadcrumbService } from '../../app-main/app.breadcrumb.service';
import { AppComponent } from '../../app.component';
import { ActivitylogsService } from './activitylogs.service';

@Component({
  selector: 'app-activitylogs',
  templateUrl: './activitylogs.component.html',
  styleUrls: ['./activitylogs.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ActivitylogsComponent implements OnInit {
  @Input() activityLogId: any;
  @Input() items?: any = [];
  @Input() localStorageKey = 'activityLogsPaginator';
  @Input() currentPage?: number;
  @Input() page?: number;
  @Input() pageUrl: any = '/logs';
  @Input() orderBy = 'createdAt ASC'; // for front end really.
  @Input() sortType = 1;
  @Input() sortKey: any = 'createdAt';

  @Output() selectedItem = new EventEmitter<any>();
  @HostListener('window:resize', ['$event']) onWindowResize(event: any) {
    this.isMobile = this.app.checkScreenSize();
    this.buildTableColumns();
  }
  selectedItems = [];
  where = {};
  sortBy = [];
  dbPage = 0;
  queryParams: any;
  params: any;
  totalRecords: number = 0;
  cols: any = [];
  isLoading = true;
  searchTerm = '';
  limit: number = this.app.isMobile ? 15 : 10;

  // Filters
  @Input() inputFilterKey: any;
  @Input() inputFilterValue: any;
  @Input() inputFilterName: any;
  @Input() inputFilterOperator: any = 'eq';

  @Input() inputFilterKeys: any = [];
  @Input() inputFilterValues: any = [];
  @Input() inputFilterNames: any = [];

  activeFilters?: any = [];
  @Input() activeFiltersInput: any = [];

  extraFilters: any = [];
  @Input() extraFiltersInput: any = [];

  outsideFilters: any = [];
  @Input() outsideFiltersInput: any = [];

  showDeleteDialog = false;
  deleteItemId?: any;

  isMobile: boolean = false;

  constructor(
    private activitylogsService: ActivitylogsService,
    public app: AppComponent,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: AppBreadcrumbService
  ) {}

  async ngOnInit() {
    this.breadcrumbService.setItems([{ label: 'Activity Logs' }]);
    this.isMobile = this.app.isMobile;
    this.localStorageKey = 'stagesPaginator-';
    this.buildTableColumns();
    this.getItemsPaginated();
  }

  buildTableColumns() {
    if (this.app.isMobile) {
      this.cols = [
        { field: 'id', header: 'Id', fieldType: 'numeric' },
        { field: 'contentType', header: 'Type', fieldType: 'text' },
        { field: 'createdAt', header: 'Created', fieldType: 'date' },
        { field: 'createdBy', header: 'Created By', fieldType: 'numeric' },

        // { field: 'startDate', header: 'Start', fieldType: 'date' },
        // { field: 'endDate', header: 'End', fieldType: 'date' },
        { field: 'actions', header: 'Actions', fieldType: 'text' },
      ];
    } else {
      this.cols = [
        { field: 'id', header: 'Id', fieldType: 'numeric' },
        { field: 'contentType', header: 'Type', fieldType: 'text' },
        { field: 'createdAt', header: 'Created', fieldType: 'date' },
        // { field: 'startDate', header: 'Start', fieldType: 'date' },
        // { field: 'endDate', header: 'End', fieldType: 'date' },
        { field: 'createdBy', header: 'Created By', fieldType: 'numeric' },
        { field: 'actions', header: 'Actions', fieldType: 'text' },
      ];
    }
  }

  loadData(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    //globalFilter: Value of the global filter if available

    // console.log('event', event);
    if (event.first && event.rows) {
      this.currentPage = event.first / event.rows;
    } else {
      this.currentPage = 1;
    }

    // @TODO: Need to add filters to this.activeFilters

    this.sortKey = event.sortField;
    this.sortType = event.sortOrder === -1 ? -1 : 1;
    this.dbPage = this.currentPage - 1;
    this.getItemsPaginated();
  }

  async getItemsPaginated() {
    this.isLoading = true;
    // console.log('about to fetch with active filters: ', this.activeFilters);
    const sortType = this.sortType === -1 ? 'ASC' : 'DESC';

    const requestParams: any = {
      where: this.where,
      limit: this.limit,
      page: this.dbPage,
      sortKey: this.sortKey,
      sortType: sortType,
      baseSearchTerm: this.searchTerm,
      activeFilters: [],
      // include: ['teamLead', 'projects'],
      // filterMode: 'developers',
    };

    const r: any = await this.activitylogsService.getPaginated(requestParams).toPromise();
    console.log('Logs', r);
    if (r.status === 'success') {
      this.items = r.data;
      this.totalRecords = r.total;
    } else {
      this.items = [];
      this.totalRecords = 0;
    }
    this.isLoading = false;
  }

  confirmDelete(item: any) {
    this.showDeleteDialog = true;
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });
    this.deleteItemId = item;
  }

  closeConfirmDelete() {
    this.showDeleteDialog = false;
    this.messageService.clear('c');
    this.deleteItemId = null;
  }

  selectRow(event: any) {
    // console.log('SelectedRow Item', this.selectedItems);
    this.selectedItem.emit(this.selectedItems);
  }

  unSelectRow(event: any) {
    this.selectedItem.emit(this.selectedItems);
  }

  async deleteItem() {
    const result: any = await this.activitylogsService.delete(Number(this.deleteItemId.id)).toPromise();
    // console.log('result', result);
    this.deleteItemId = null;
    if (result.status === 'success') {
      this.messageService.add({
        severity: 'success',
        sticky: true,
        summary: 'Success!',
        detail: 'Item has been deleted!',
      });
      this.messageService.clear('c');
      this.isLoading = true;
      window.scrollTo(0, 0);
      this.confirmationService.confirm({
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        message: 'Item Deleted!',
        accept: () => {
          // Actual logic to perform a confirmation
          // this.router.navigate(['/admin/view/elasticsearch/indexes']);
          this.ngOnInit();
        },
      });
      //  this.router.navigate(['/cs/view/users/1']);
    } else {
      this.deleteItemId = null;
      this.messageService.clear('c');
      this.messageService.add({
        key: 'a',
        severity: 'error',
        sticky: true,
        summary: 'Error!',
        detail: 'Error Deleting Item',
      });
    }
  }
}
