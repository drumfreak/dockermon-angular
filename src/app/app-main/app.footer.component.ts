import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-footer',
  template: `
    <div class="layout-footer flex align-items-center p-4 shadow-2">
      <div class="col-12 text-center">&copy; 2022 - DockerMon</div>
    </div>
  `,
})
export class AppFooterComponent {
  constructor(public app: AppComponent) {}
}
