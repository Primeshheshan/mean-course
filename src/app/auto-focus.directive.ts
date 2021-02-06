import { OnInit, EventEmitter, Directive, ElementRef, Input  } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {
  @Input('autoFocus') public appAutoFocus!: EventEmitter <boolean>;

  constructor(private el: ElementRef) {}

  public ngOnInit() {

      setTimeout(() => {
          this.el.nativeElement.focus();
      }, 10);
  }

}
