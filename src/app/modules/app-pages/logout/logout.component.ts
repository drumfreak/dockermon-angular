import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private loginService: LoginService, private app: AppComponent) {}

  ngOnInit() {
    console.log('Logging out');
    this.loginService.logout();
    this.app.user = null;
  }
}
