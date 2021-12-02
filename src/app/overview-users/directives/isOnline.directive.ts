import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[appIsOnline]'
})

export class IsOnlineDirective {
  @Input('appIsOnline') isOnline: boolean = false

  constructor(private el: ElementRef, private r: Renderer2) {
    console.log(this.isOnline)
    this.r.setStyle(this.el.nativeElement, 'color', 'red')
  }
}
