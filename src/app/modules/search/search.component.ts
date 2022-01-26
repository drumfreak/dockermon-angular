import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppMainComponent } from '../../app-main/app-main.component';
import { AppBreadcrumbService } from '../../app-main/app.breadcrumb.service';
import { AppComponent } from '../../app.component';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$: Subject<void> = new Subject();
  searchTerm = '';
  isLoading = false;
  results?: any;
  source: any;
  @ViewChild('searchInput') searchInput?: ElementRef;

  @Input() localStorageKey = 'searchPaginator';
  @Input() modelName = '';
  @Input() pageUrl: any = '/search';
  @Input() currentPage?: number;
  @Input() page?: number;
  @Input() inputPage?: number;
  @Input() showTitle = true;
  @Input() showPaginatorControls = true;
  @Input() showCarousel = false;
  @Input() showExplain = false;
  isMobile = false;
  items: any = []; // Paginated Items.
  paginatorItems = 5;
  indexes: any = ['developers', 'stories'];

  total?: number;
  initialLoad = false;
  limit: number = this.app.isMobile ? 15 : 50;
  limitDefault: number = this.app.isMobile ? 15 : 50;

  cols: any = [];
  totalRecords = 0;
  queryParams?: any;

  constructor(
    private searchService: SearchService,
    private app: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private appMain: AppMainComponent,
    private breadcrumbService: AppBreadcrumbService,
  ) {}

  ngOnInit() {
    this.breadcrumbService.setItems([{ label: 'Search' }]);
    this.cols = [
      {
        field: 'relevance',
        header: 'Relevance',
        fieldType: 'numeric',
        noFilter: false,
      },
      { field: 'result', header: 'Result', fieldType: 'text', noFilter: false },
      { field: 'type', header: 'Type', fieldType: 'text', noFilter: false },
      { field: 'author', header: 'Author', fieldType: 'date', noFilter: false },
      {
        field: 'createdAt',
        header: 'Created',
        fieldType: 'date',
        noFilter: false,
      },
      // { field: 'actions', header: 'Actions', fieldType: 'text', noFilter: true },
    ];

    this.route.queryParams.subscribe((q: any) => {
      if (q) {
        this.queryParams = q;
        if (this.queryParams.q) {
          this.searchTerm = this.queryParams.q;
          this.search();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.searchInput) {
      // this.source = fromEvent(this.searchInput.nativeElement, 'keyup.enter');
      // this.source.pipe(debounceTime(200)).subscribe((c: any) => {
      //   // list = list.filter(item => item.label.toLocaleLowerCase().includes(this.searchedKPI.toLocaleLowerCase())).slice();
      //   console.log('I will search for ', this.searchTerm);
      // });
      this.searchInput.nativeElement.focus();
    }
  }

  async search() {
    this.isLoading = true;

    let term = '*';
    if (this.searchTerm !== '') {
      term = this.searchTerm;
    }
    console.log('Searching', this.searchTerm);
    const r: any = await this.searchService
      .search({
        index: this.indexes,
        searchTerm: term,
        page: 0,
        limit: 10,
      })
      .toPromise();
    if (r.status === 'success') {
      this.results = {};
      this.results = r.data;
      this.results.maxScore = r.data.hits.max_score;

      this.results.results = r.data.hits.hits.map((hit: any) => {
        // console.log(hit);
        let resultText;
        switch (hit._type) {
          case 'developer':
            resultText =
              hit._source.body.firstName + ' ' + hit._source.body.lastName;
            break;

          default:
            resultText = hit._source.body.name;
            break;
        }

        const ret = {
          relevance: Math.round((hit._score / this.results.maxScore) * 100),
          score: hit._score,
          index: hit._index,
          type: hit._type,
          body: hit._source.body,
          author: hit._source.author,
          contentId: hit._source.contentId,
          resultText: resultText,
          createdAt: new Date(hit._source.body.createdAt),
        };

        console.log(ret);
        return ret;
      });
    } else {
      this.results = [];
    }

    this.isLoading = false;
    console.log('Search Results', r);
  }

  loadData(event: any) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
