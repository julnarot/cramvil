import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  template: `
    <div>
      <button
        nbButton
        shape="round"
        hero
        size="giant"
        status="info"
        (click)="clicked.emit()"
      >
        <nb-icon [icon]="icon"></nb-icon>
      </button>
    </div>
  `,
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent {
  @Output() clicked = new EventEmitter<void>();
  @Input() icon = 'plus-outline';
}
