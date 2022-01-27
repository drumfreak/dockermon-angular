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
  selector: 'app-docker-processes-bar-chart',
  templateUrl: './docker-processes-bar-chart.component.html',
  styleUrls: ['./docker-processes-bar-chart.component.css'],
})
export class DockerProcessesBarChartComponent implements OnInit, AfterViewInit {
  @Input() container: any;
  @Input() mode = 'Points';
  @Input() chartData: any;
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
          label: 'Processes',
          data: this.chartData,
          backgroundColor: '#6600cc',
          fill: true,
          hoverBackgroundColor: '#3380FF',
        },
      ],
    };

    this.updateChartOptions();

    if (this.chart1ViewChild) {
      if (this.chart1ViewChild.chart) {
        // console.log('Update Chart')
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
