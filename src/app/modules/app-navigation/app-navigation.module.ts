import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavigationComponent } from './app-navigation.component';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';

@NgModule({
  imports: [CommonModule, PrimengStuffModule],
  declarations: [AppNavigationComponent],
  exports: [AppNavigationComponent],
})
export class AppNavigationModule {}
