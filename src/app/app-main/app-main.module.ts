import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengStuffModule } from '../modules/primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../modules/theme/theme.module';

import { MenuService } from './app.menu.service';
import { AppMenuComponent } from './app.menu.component';
import { AppMainComponent } from './app-main.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppConfigComponent } from './app.config.component';
import { AppFooterComponent } from './app.footer.component';
import { AppInlineMenuComponent } from './app.inlinemenu.component';
import { AppRightMenuComponent } from './app.rightmenu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppBreadcrumbService } from './app.breadcrumb.service';
import { AppMenuitemComponent } from './app.menuitem.component';

@NgModule({
  imports: [CommonModule, PrimengStuffModule, ThemeModule, ReactiveFormsModule, FormsModule],
  declarations: [
    AppMenuComponent,
    AppMainComponent,
    AppBreadcrumbComponent,
    AppConfigComponent,
    AppFooterComponent,
    AppInlineMenuComponent,
    AppTopBarComponent,
    AppRightMenuComponent,
    AppMenuitemComponent,
  ],
  exports: [AppMainComponent],
  providers: [MenuService, AppBreadcrumbService],
})
export class AppMainModule {}
