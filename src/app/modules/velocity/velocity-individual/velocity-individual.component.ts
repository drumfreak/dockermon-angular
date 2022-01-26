import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-velocity-individual',
  templateUrl: './velocity-individual.component.html',
  styleUrls: ['./velocity-individual.component.css'],
})
export class VelocityIndividualComponent implements OnInit {
  @Input() developer: any;
  @Input() mode: any = 'Points';
  selectedSprint?: any;
  math = Math;
  isLoading = true;
  isMobile = false;
  @HostListener('window:resize', ['$event']) onWindowResize(event: any) {
    // if (!this.isMobile) {
    this.isMobile = this.app.checkScreenSize();
    //  }
  }

  constructor(private app: AppComponent) {}

  ngOnInit() {
    this.isMobile = this.app.isMobile;
    setTimeout(() => {
      this.isLoading = false;
    });
  }

  tabClick(event: any) {
    this.isLoading = true;
    switch (event.index) {
      case 0:
        this.mode = 'Points';
        break;
      case 1:
        this.mode = 'Stories';
        break;
    }

    console.log('Mode', this.mode);
    this.isLoading = false;
    // console.log('tabClick', event);
  }

  selectSprint(event: any) {
    // console.log('Selected Sprint', event);
  }

  goToSprint() {
    console.log('Going to sprint', this.selectedSprint);
  }
}
