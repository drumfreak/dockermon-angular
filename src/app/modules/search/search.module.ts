import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { SearchRoutes } from './search.routing';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  imports: [CommonModule, SearchRoutes, PrimengStuffModule, ThemeModule],
  declarations: [SearchComponent],
  providers: [SearchService],
})
export class SearchModule {}
