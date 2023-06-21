import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(){
    this.elementRef.nativeElement.style.backgroundColor='gray';
  }
}
