import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { CodeHighlighterComponent } from './code-highlighter/code-highlighter.component';

@NgModule({
  imports: [CommonModule, PrimengStuffModule],
  declarations: [ThemeComponent, SpinnerComponent, CodeHighlighterComponent],
  exports: [SpinnerComponent, CodeHighlighterComponent],
})
export class ThemeModule {}
