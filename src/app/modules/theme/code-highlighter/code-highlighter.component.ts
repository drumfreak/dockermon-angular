import { Component, ElementRef, ViewChild, Input, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-code-highlighter',
  templateUrl: './code-highlighter.component.html',
  styleUrls: ['./code-highlighter.component.scss'],
})
export class CodeHighlighterComponent implements AfterViewInit, OnChanges {
  @Input() code: any;
  @ViewChild('codeChild') codeViewChild: ElementRef | undefined;
  @Input() isActive: boolean = false;
  @Input() title: string = 'Code Object';

  constructor(public el: ElementRef) {}

  ngOnChanges() {
    // console.log('Change...');
    // this.code = this.code;
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:no-string-literal
    if (window['Prism']) {
      // tslint:disable-next-line:no-string-literal
      if (this.codeViewChild) {
        window['Prism'].highlightElement(this.codeViewChild.nativeElement);
      }
    }
  }
}
