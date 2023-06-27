import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

const NEBULAR_MODULES: any[] = [
  NbButtonModule,
  NbCardModule,
  NbIconModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...NEBULAR_MODULES],
  exports: [...NEBULAR_MODULES],
})
export class SharedModule {}
