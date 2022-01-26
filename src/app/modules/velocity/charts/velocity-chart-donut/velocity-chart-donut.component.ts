import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { AppComponent } from '../../../../app.component';
import { ChartColors } from '../../chart-colors';

@Component({
  selector: 'app-velocity-chart-donut',
  templateUrl: './velocity-chart-donut.component.html',
  styleUrls: ['./velocity-chart-donut.component.css'],
})
export class VelocityChartDonutComponent implements OnInit {
  @Input() developer: any;
  data: any;
  chartOptions: any;
  @Input() mode = 'Points';
  isMobile: boolean = false;
  isLoading = true;
  @ViewChild('chart') chartViewChild?: UIChart;

  constructor(private app: AppComponent, private chartColors: ChartColors) {}
  ngOnInit() {
    this.isMobile = this.app.checkScreenSize();
    this.setupChart();
  }

  setupChart() {
    const cols = [];
    const devData = [];
    const colors = [];
    const hoverColors = [];
    const borderColors: any = [];

    if (this.mode === 'Points') {
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
    // [
    //   this.developer.storiesAwaiting,
    //   this.developer.storiesInProgress,
    //   this.developer.storiesAwaitingQA,
    //   this.developer.storiesBlocked,
    //   this.developer.storiesAwaitingPR,
    //   this.developer.storiesReady,
    //   this.developer.storiesInProduction,
    //   this.developer.storiesComplete,
    // ];

    this.data = {
      labels: cols,
      datasets: [
        {
          data: devData,
          backgroundColor: colors,
          hoverBackgroundColor: hoverColors,
          borderColor: borderColors,
          spacing: 0,
          offset: 0,
          rotation: 0,
        },
      ],
    };

    // this.config = this.configService.config;
    this.updateChartOptions();
    // this.subscription = this.configService.configUpdate$.subscribe(config => {
    //     this.config = config;
    //     this.updateChartOptions();
    // });

    if (this.chartViewChild) {
      if (this.chartViewChild.chart) {
        this.chartViewChild.chart.update();
      }
    }
  }

  updateChartOptions() {
    this.chartOptions = this.getDarkTheme();
  }

  getLightTheme() {
    return {
      borderWidth: 0,
      plugins: {
        legend: {
          display: !this.isMobile,
          labels: {
            position: 'bottom',
            color: '#495057',
          },
        },
      },
    };
  }

  getDarkTheme() {
    return {
      borderWidth: 0,
      plugins: {
        legend: {
          maxWidth: 100,
          fullSize: false,
          display: !this.isMobile,
          position: 'bottom',
          labels: {
            padding: 20,
            color: '#ebedef',
          },
        },
      },
    };
  }
}
