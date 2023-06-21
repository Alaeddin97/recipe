import { Directive, Renderer2,OnInit, ElementRef, HostListener,HostBinding,Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input('appBetterHighlight') customBackgroundColor:string='rgb(220,220,220)';
  @HostBinding('style.backgroundColor') backgroundColor:string='transparent';

  constructor(private elRef:ElementRef,private renderer:Renderer2) { }
  ngOnInit(): void {
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
  }
  
  @HostListener('mouseenter') mouseover(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','rgb(220,220,220)');
    this.backgroundColor=this.customBackgroundColor;

  }
  @HostListener('mouseleave') mouseleave(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','transparent');
    this.backgroundColor='transparent';

  }


}
