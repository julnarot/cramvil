import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputFocus]',
})
export class InputFocusDirective implements AfterViewInit {
  constructor(private readonly host: ElementRef) {}

  ngAfterViewInit(): void {
    this.host.nativeElement.focus();
  }
}
