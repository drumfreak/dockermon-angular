import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from '../../../app.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class UsersComponent implements OnInit {
  @Input() localStorageKey = 'usersMainPaginator';
  @Input() currentPage?: number;
  @Input() page?: number;
  @Input() pageTitle = 'View Users';
  @Input() modelName = 'users';
  @Input() pageUrl: any = '/admin/users';
  @Input() inputPage?: number;
  @Input() showTitle = true;
  @Input() showPaginatorControls = true;
  @Input() showCarousel = false;
  @Input() showExplain = false;

  @Input() searchValue = '';
  @Input() orderBy = 'id ASC'; // for front end really.
  @Input() sortType = 'ASC';
  @Input() sortKey: any = 'id';

  @Input() inputFilterKey: any;
  @Input() inputFilterValue: any;
  @Input() inputFilterName: any;
  @Input() inputFilterOperator: any = 'eq';

  @Input() inputFilterKeys: any = [];
  @Input() inputFilterValues: any = [];
  @Input() inputFilterNames: any = [];

  @Input() filterPlanId: any;

  // Mobile for tables.
  isMobile = false;
  items: any = []; // Paginated Items.
  paginatorItems = 5;
  mobileMenuItems?: MenuItem[];
  activeItem?: MenuItem;

  total?: number;
  isLoading = true;
  initialLoad = false;
  searchTerm = '';
  activeTab = 3;
  pageTab = 3;
  limit: number = this.app.isMobile ? 15 : 10;
  limitDefault: number = this.app.isMobile ? 15 : 10;
  limits = [
    { name: 5, value: 5 },
    { name: 10, value: 10 },
    { name: 15, value: 15 },
    { name: 20, value: 20 },
    { name: 25, value: 25 },
    { name: 50, value: 50 },
    { name: 100, value: 100 },
    { name: 250, value: 250 },
  ];

  // New Paginator
  liveFilter = false;
  filters: any = [];
  activeFilters?: any = [];
  @Input() activeFiltersInput: any = [];
  extraFilters: any = [];
  @Input() extraFiltersInput: any = [];
  outsideFilters: any = [];
  @Input() outsideFiltersInput: any = [];
  @Input() inputFilters: any = [];
  filterChangeTimer: any;
  filterString = null;
  selectedItems = [];
  sortBy = [];
  tableSortField = 'id';
  tableSortOrder = -1;
  selectedSort: any;
  checkAll = false;
  where = '1';

  resultsFrom = 0;
  resultsTo = 0;
  dbPage = 0;
  newSearch = false;
  queryParams: any;
  params: any;
  overlays = [];

  cols: any = [];
  totalRecords: number = 0;
  selectedItem: any;
  showDeleteDialog = false;
  deleteUser?: any;

  constructor(
    private userService: UsersService,
    private app: AppComponent,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Id', fieldType: 'numeric' },
      { field: 'firstName', header: 'First Name', fieldType: 'text' },
      { field: 'lastName', header: 'Last Name', fieldType: 'text' },
      { field: 'email', header: 'Email', fieldType: 'text' },
      { field: 'role', header: 'Role', fieldType: 'text' },
      { field: 'createdAt', header: 'Created', fieldType: 'date' },
      { field: 'actions', header: 'Actions', fieldType: 'text' },
    ];
    this.getItemsPaginated();
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
    this.sortType = event.sortOrder === -1 ? 'ASC' : 'DESC';
    this.dbPage = this.currentPage - 1;
    this.getItemsPaginated();
  }

  async getItemsPaginated() {
    this.isLoading = true;
    // console.log('about to fetch with active filters: ', this.activeFilters);
    const requestParams: any = {
      where: this.where,
      limit: this.limit,
      page: this.dbPage,
      sortKey: this.sortKey,
      sortType: this.sortType,
      baseSearchTerm: this.searchTerm,
      activeFilters: this.activeFilters,
      include: ['firstName', 'lastName', 'email', 'role'],
    };

    const r: any = await this.userService.getUsers(requestParams).toPromise();
    console.log(r);
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
    this.deleteUser = item;
  }

  closeConfirmDelete() {
    this.showDeleteDialog = false;
    this.messageService.clear('c');
    this.deleteUser = null;
  }

  async deleteItem() {
    const result: any = await this.userService.deleteUser(Number(this.deleteUser.id)).toPromise();
    // console.log('result', result);
    this.deleteUser = null;
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
      this.deleteUser = null;
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
