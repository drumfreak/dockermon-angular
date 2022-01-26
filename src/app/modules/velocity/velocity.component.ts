import { Component, OnInit } from '@angular/core';
import { VelocityService } from './velocity.service';

@Component({
  selector: 'app-velocity',
  templateUrl: './velocity.component.html',
  styleUrls: ['./velocity.component.css'],
})
export class VelocityComponent implements OnInit {
  isLoading = true;
  sprints: any = [];
  sprintList: any = [];
  mode = 'Points';
  math = Math;
  selectedSprint = 0;

  constructor(private velocityService: VelocityService) {}

  async ngOnInit() {
    const r1: any = await this.velocityService.getSprints().toPromise();
    if (r1.status) {
      this.sprintList = r1.results;
    }

    const r: any = await this.velocityService.getSprintVelocity({}).toPromise();
    if (r.status === 'success') {
      // console.log('Results', r);
      this.sprints = r.results.sprints;
    }
    if (r.status === 'fail') {
      console.warn('Error', r);
    }
    this.isLoading = false;
  }

  tabClick(event: any) {
    switch (event.index) {
      case 0:
        this.mode = 'Points';
        break;
      case 1:
        this.mode = 'Stories';
        break;
    }
    console.log('tabClick', event);
  }

  selectSprint(event: any) {
    console.log('Selected Sprint', event);
  }

  goToSprint() {
    console.log('Going to sprint', this.selectedSprint);
  }
}
