import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  @HostBinding('class.open') isClick=false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isClick = this.elRef.nativeElement.contains(event.target) ? !this.isClick : false;
  }
  constructor(private elRef: ElementRef) {}
}

