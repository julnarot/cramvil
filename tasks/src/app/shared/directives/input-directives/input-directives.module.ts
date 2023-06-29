import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFocusDirective } from './input-focus.directive';

@NgModule({
  declarations: [InputFocusDirective],
  imports: [CommonModule],
  exports: [InputFocusDirective],
})
export class InputDirectivesModule {}
