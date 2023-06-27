import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardContainerComponent } from './components/board-container/board-container.component';

@NgModule({
  declarations: [BoardContainerComponent],
  imports: [CommonModule],
  exports: [BoardContainerComponent],
})
export class BoardModule {}
