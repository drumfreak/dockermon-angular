import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-docker-network-line-chart',
  templateUrl: './docker-network-line-chart.component.html',
  styleUrls: ['./docker-network-line-chart.component.css'],
})
export class DockerNetworkLineChartComponent implements OnInit, AfterViewInit {
  @Input() container: any;
  @Input() mode = 'Points';
  @Input() chartData1: any;
  @Input() chartData2: any;
  @Input() dateData: any;
  data: any;
  chartOptions: any;
  multiAxisOptions: any;
  stackedData: any;
  stackedOptions: any;
  horizontalOptions: any;
  isLoading = true;
  @ViewChild('chart1') chart1ViewChild: UIChart = {} as UIChart;

  constructor() {}

  ngOnInit() {
    if (this.isLoading) {
      this.updateChart();
    }
  }

  updateChart() {
    this.data = {
      labels: this.dateData,
      datasets: [
        {
          label: 'Network In',
          data: this.chartData1,
          backgroundColor: '#e60099',
          borderColor: '#e60099',
          fill: false,
          hoverBackgroundColor: '#3380FF',
        },
        {
          label: 'Network Out',
          data: this.chartData2,
          backgroundColor: '#e67300',
          borderColor: '#e67300',
          fill: false,
          hoverBackgroundColor: '#3380FF',
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

    this.updateChartOptions();

    if (this.chart1ViewChild) {
      if (this.chart1ViewChild.chart) {
        // console.log('Update Network Chart');
        this.chart1ViewChild.chart.update();
      }
    }
    this.isLoading = false;
  }

  ngAfterViewInit() {
    // this.isLoading = false;
    // if (this.chart1ViewChild) {
    //   if (this.chart1ViewChild.chart) {
    //     console.log('Update Chart')
    //     this.chart1ViewChild.chart.update();
    //   }
    // }
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
          min: 0.0,
          max: 2.0,
          type: 'time',
          time: {
            // Luxon format string
            tooltipFormat: 'DD T',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },

        y: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
          min: 0.0,
          max: 2.0,
        },
      },
    };
  }

  getDarkTheme() {
    return {
      responsive: true,
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
            autoSkip: true,
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
}
