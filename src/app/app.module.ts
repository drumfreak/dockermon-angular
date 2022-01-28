import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './JWTInterceptor';
import { ErrorInterceptor } from './modules/error/error.interceptor';
import { PrimengStuffModule } from './modules/primeng-stuff/primeng-stuff.module';
import { AppNavigationModule } from './modules/app-navigation/app-navigation.module';
import { AppPagesModule } from './modules/app-pages/app-pages.module';
import { AuthGuard } from './auth.guard';
import { ThemeModule } from './modules/theme/theme.module';
import { ChartColors } from './modules/velocity/chart-colors';
import { AppMainModule } from './app-main/app-main.module';
import { AppDashboardModule } from './dashboards/app-dashboard/app-dashboard.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WebSocketService } from './services/websocket.service';

const config: SocketIoConfig = {
  url: 'ws://localhost:3811/events',
  options: {},
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    PrimengStuffModule,
    AppMainModule,
    ThemeModule,
    AppNavigationModule,
    AppPagesModule,
    AppDashboardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AppComponent,
    ChartColors,
    WebSocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
