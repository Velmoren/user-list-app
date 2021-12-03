import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appIsOnline]'
})

export class IsOnlineDirective implements OnInit {
  @Input('appIsOnline') isOnline?: boolean

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit(): void {
    if (this.isOnline) {
      this.r.setStyle(this.el.nativeElement, 'color', 'green')
    } else {
      this.r.setStyle(this.el.nativeElement, 'color', 'red')
    }
  }
}
