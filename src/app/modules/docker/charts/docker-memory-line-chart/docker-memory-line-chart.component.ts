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
  selector: 'app-docker-memory-line-chart',
  templateUrl: './docker-memory-line-chart.component.html',
  styleUrls: ['./docker-memory-line-chart.component.css'],
})
export class DockerMemoryLineChartComponent implements OnInit, AfterViewInit {
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
    this.updateChartOptions();
    this.data = {
      labels: this.dateData,
      datasets: [
        {
          label: 'Memory Data',
          data: this.chartData,
          backgroundColor: '#33ccF0',
          borderColor: '#33cc33',
          fill: false,
          hoverBackgroundColor: '#3380FF',
        },
      ],
    };

    if (this.chart1ViewChild) {
      if (this.chart1ViewChild.chart) {
        // console.log('Update Memory Chart')
        this.chart1ViewChild.chart.update();
      }
    }
    this.isLoading = false;
  }

  ngAfterViewInit() {}

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
      scales: {},
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
