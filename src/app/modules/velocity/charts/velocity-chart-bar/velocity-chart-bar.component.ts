import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { AppComponent } from '../../../../app.component';
import { ChartColors } from '../../chart-colors';

@Component({
  selector: 'app-velocity-chart-bar',
  templateUrl: './velocity-chart-bar.component.html',
  styleUrls: ['./velocity-chart-bar.component.css'],
})
export class VelocityChartBarComponent implements OnInit, AfterViewInit {
  @Input() developer: any;
  @Input() mode = 'Points';
  data: any;
  chartOptions: any;
  multiAxisOptions: any;
  stackedData: any;
  stackedOptions: any;
  horizontalOptions: any;
  isMobile = false;
  isLoading = true;
  @ViewChild('chart123') chartViewChild?: UIChart;

  constructor(private app: AppComponent, private chartColors: ChartColors) {}

  ngOnInit() {
    this.isMobile = this.app.checkScreenSize();
  }

  ngAfterViewInit() {
    this.setupChart();
  }

  setupChart() {
    const cols = [];
    const devData = [];
    const colors = [];
    const hoverColors = [];
    const borderColors: any = [];

    if (this.mode === 'Points') {
      if (this.developer.storyPoints) {
        devData.push(this.developer.storyPoints);
        cols.push('Assigned');
        colors.push(this.chartColors.assigned);
        hoverColors.push(this.chartColors.hoverColors.assigned);
        borderColors.push(this.chartColors.borderColors.assigned);
      }
      if (this.developer.storyPointsAwaiting) {
        devData.push(this.developer.storyPointsAwaiting);
        cols.push('Awaiting');
        colors.push(this.chartColors.awaiting);
        hoverColors.push(this.chartColors.hoverColors.awaiting);
        borderColors.push(this.chartColors.borderColors.awaiting);
      }
      if (this.developer.storyPointsInProgress) {
        devData.push(this.developer.storyPointsInProgress);
        cols.push('Working');
        colors.push(this.chartColors.inProgress);
        hoverColors.push(this.chartColors.hoverColors.inProgress);
        borderColors.push(this.chartColors.borderColors.inProgress);
      }
      if (this.developer.storyPointsAwaitingQA) {
        devData.push(this.developer.storyPointsAwaitingQA);
        cols.push('QA');
        colors.push(this.chartColors.awaitingQA);
        hoverColors.push(this.chartColors.hoverColors.awaitingQA);
        borderColors.push(this.chartColors.borderColors.awaitingQA);
      }
      if (this.developer.storyPointsBlocked) {
        devData.push(this.developer.storyPointsBlocked);
        cols.push('Blocked');
        colors.push(this.chartColors.blocked);
        hoverColors.push(this.chartColors.hoverColors.blocked);
        borderColors.push(this.chartColors.borderColors.blocked);
      }
      if (this.developer.storyPointsAwaitingPR) {
        devData.push(this.developer.storyPointsAwaitingPR);
        cols.push('PR');
        colors.push(this.chartColors.awaitingPR);
        hoverColors.push(this.chartColors.hoverColors.awaitingPR);
        borderColors.push(this.chartColors.borderColors.awaitingPR);
      }
      if (this.developer.storyPointsReady) {
        devData.push(this.developer.storyPointsReady);
        cols.push('Ready');
        colors.push(this.chartColors.ready);
        hoverColors.push(this.chartColors.hoverColors.ready);
        borderColors.push(this.chartColors.borderColors.ready);
      }
      if (this.developer.storyPointsInProduction) {
        devData.push(this.developer.storyPointsInProduction);
        cols.push('Production');
        colors.push(this.chartColors.inProduction);
        hoverColors.push(this.chartColors.hoverColors.inProduction);
        borderColors.push(this.chartColors.borderColors.inProduction);
      }
      if (this.developer.storyPointsComplete) {
        devData.push(this.developer.storyPointsComplete);
        cols.push('Complete');
        colors.push(this.chartColors.complete);
        hoverColors.push(this.chartColors.hoverColors.complete);
        borderColors.push(this.chartColors.borderColors.complete);
      }
    }

    if (this.mode === 'Stories') {
      if (this.developer.storyCount) {
        devData.push(this.developer.storyCount);
        cols.push('Assigned');
        colors.push(this.chartColors.assigned);
        hoverColors.push(this.chartColors.hoverColors.assigned);
        borderColors.push(this.chartColors.borderColors.assigned);
      }

      if (this.developer.storiesAwaiting) {
        devData.push(this.developer.storiesAwaiting);
        cols.push('Awaiting');
        colors.push(this.chartColors.awaiting);
        hoverColors.push(this.chartColors.hoverColors.awaiting);
        borderColors.push(this.chartColors.borderColors.awaiting);
      }
      if (this.developer.storiesInProgress) {
        devData.push(this.developer.storiesInProgress);
        cols.push('Working');
        colors.push(this.chartColors.inProgress);
        hoverColors.push(this.chartColors.hoverColors.inProgress);
        borderColors.push(this.chartColors.borderColors.inProgress);
      }
      if (this.developer.storiesAwaitingQA) {
        devData.push(this.developer.storiesAwaitingQA);
        cols.push('QA');
        colors.push(this.chartColors.awaitingQA);
        hoverColors.push(this.chartColors.hoverColors.awaitingQA);
        borderColors.push(this.chartColors.borderColors.awaitingQA);
      }
      if (this.developer.storiesBlocked) {
        devData.push(this.developer.storiesBlocked);
        cols.push('Blocked');
        colors.push(this.chartColors.blocked);
        hoverColors.push(this.chartColors.hoverColors.blocked);
        borderColors.push(this.chartColors.borderColors.blocked);
      }
      if (this.developer.storiesAwaitingPR) {
        devData.push(this.developer.storiesAwaitingPR);
        cols.push('PR');
        colors.push(this.chartColors.awaitingPR);
        hoverColors.push(this.chartColors.hoverColors.awaitingPR);
        borderColors.push(this.chartColors.borderColors.awaitingPR);
      }
      if (this.developer.storiesReady) {
        devData.push(this.developer.storiesReady);
        cols.push('Ready');
        colors.push(this.chartColors.ready);
        hoverColors.push(this.chartColors.hoverColors.ready);
        borderColors.push(this.chartColors.borderColors.ready);
      }
      if (this.developer.storiesInProduction) {
        devData.push(this.developer.storiesInProduction);
        cols.push('Production');
        colors.push(this.chartColors.inProduction);
        hoverColors.push(this.chartColors.hoverColors.inProduction);
        borderColors.push(this.chartColors.borderColors.inProduction);
      }
      if (this.developer.storiesComplete) {
        devData.push(this.developer.storiesComplete);
        cols.push('Complete');
        colors.push(this.chartColors.complete);
        hoverColors.push(this.chartColors.hoverColors.complete);
        borderColors.push(this.chartColors.borderColors.complete);
      }
    }

    this.data = {
      labels: cols,

      datasets: [
        {
          label: this.mode,
          data: devData,
          backgroundColor: colors,
          hoverBackgroundColor: hoverColors,
        },
      ],
    };

    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };

    // this.config = this.configService.config;
    this.updateChartOptions();
    this.isLoading = false;
    // this.subscription = this.configService.configUpdate$.subscribe(config => {
    //     this.config = config;
    //     this.updateChartOptions();
    // });

    if (this.chartViewChild) {
      if (this.chartViewChild.chart) {
        const that = this;
        setTimeout((that: any) => {
          // that.chartViewChild.chart.update();
          console.log('Updating');
        });
      }
    }
  }

  updateChartOptions() {
    this.chartOptions = this.getDarkTheme();
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
  }

  getDarkTheme() {
    return {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16,
      },
      legend: {
        position: 'bottom',
      },
      plugins: {
        legend: {
          labels: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
