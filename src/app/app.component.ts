import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dockermon - Docker Stats Monitor';
  topbarTheme: string = 'blue';
  menuTheme: string = 'dark';
  layoutMode: string = 'dark';
  menuMode: string = 'static';
  inlineMenuPosition: string = 'top';
  inputStyle: string = 'outlined';
  ripple: boolean = true;
  isRTL: boolean = false;

  isLoading = true;
  isMobile: boolean = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 992 ? true : false;
  isInputBackgroundChanged: boolean = false;

  // loginSubscription: Subscription;

  @HostListener('window:resize', ['$event']) onWindowResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // console.log('Width is', w);
    if (w < 992) {
      this.isMobile = true;
      return true;
    } else if (w > 992) {
      this.isMobile = false;
      return false;
    } else {
      return false;
    }
  }

  public user?: any;

  constructor(public loginService: LoginService) {}

  async ngOnInit() {
    this.checkScreenSize();
    if (!this.user) {
      this.user = await this.loginService.getLoggedInUser();
    }
    if (localStorage.getItem('themeMode')) {
      this.changeThemeMode(localStorage.getItem('themeMode'));
    }
  }

  setLoggedinUser(user: any) {
    this.user = user;
    this.loginService.user = user;
  }

  async getLoggedInUser() {
    if (this.user) {
      return this.user;
    }
    const u = await this.loginService.getLoggedInUser();
    if (u) {
      this.user = u;
      this.loginService.user = u;
      return this.user;
    } else {
      return null;
    }
  }

  changeThemeMode(mode: any) {
    if (!this.isInputBackgroundChanged) {
      this.inputStyle = mode === 'dark' ? 'outlined' : 'outlined';
    }
    if (mode === 'dark') {
      this.menuTheme = 'dark';
      this.topbarTheme = 'dark';
      this.layoutMode = 'dark';
    } else {
      this.menuTheme = 'light';
      this.topbarTheme = 'light';
      this.layoutMode = 'light';
    }

    localStorage.setItem('themeMode', mode);

    //  setTimeout(() => {
    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    const layoutHref = 'assets/layout/css/layout-' + this.layoutMode + '.css';

    //  assets/theme/bootstrap4/bootstrap4-dark/blue/theme-dark.css
    this.replaceLink(layoutLink, layoutHref);

    const themeLink: any = document.getElementById('theme-css');
    // const urlTokens = themeLink.getAttribute('href').split('/');
    const newURL = '/assets/theme/custom/theme-' + this.layoutMode + '.css';

    // console.log('NEW CSS URL', newURL);
    // this.replaceLink(themeLink, newURL);

    const customLink: any = document.getElementById('theme-custom-css');
    // const customUrlTokens = themeLink.getAttribute('href').split('/');
    const customNewURL = '/assets/theme/custom/theme-' + this.layoutMode + '.css';

    // console.log('NEW CSS URL', newURL);
    // this.replaceLink(customLink, customNewURL);
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement: any, href: any, callback?: any) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
      if (callback) {
        callback();
      }
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);

        if (callback) {
          callback();
        }
      });
    }
  }
}
