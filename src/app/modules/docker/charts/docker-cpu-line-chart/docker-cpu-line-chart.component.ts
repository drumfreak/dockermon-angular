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
  selector: 'app-docker-cpu-line-chart',
  templateUrl: './docker-cpu-line-chart.component.html',
  styleUrls: ['./docker-cpu-line-chart.component.css'],
})
export class DockerCpuLineChartComponent implements OnInit, AfterViewInit {
  @Input() container: any;
  @Input() mode = 'Points';
  @Input() cpuData: any;
  @Input() dateData: any;
  data: any;
  chartOptions: any;
  multiAxisOptions: any;
  stackedData: any;
  stackedOptions: any;
  horizontalOptions: any;
  isLoading = true;
  @ViewChild('chart1', { static: false }) chart1ViewChild: UIChart =
    {} as UIChart;

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
          label: 'CPU Data',
          data: this.cpuData,
          backgroundColor: '#cc0000',
          fill: true,
          hoverBackgroundColor: '#3380FF',
          lineTension: 0,
        },
      ],
    };

    this.updateChartOptions();

    if (this.chart1ViewChild) {
      if (this.chart1ViewChild.chart) {
        // console.log('Updating Chart', this.cpuData);
        // console.log('------->>> Update Chart')
        this.chart1ViewChild.chart.update();
      }
    }
    this.isLoading = false;
  }

  ngAfterViewInit() {
    // this.isLoading = false;
    // if (this.chart1ViewChild) {
    //   if (this.chart1ViewChild.chart) {
    //     // console.log('Update Chart')
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
          type: 'timeseries',
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
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
    return {
      scales: {
        x: {
          type: 'time',
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
          min: 0.0,
          max: 2.0,
        },
      },
    };
  }
}
