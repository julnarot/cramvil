import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ListContentNotFoundComponent } from './components/list-content-not-found/list-content-not-found.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';

const NEBULAR_MODULES = [NbButtonModule, NbCardModule, NbIconModule];
const CUSTOM_COMPONENT = [ListContentNotFoundComponent, FloatingButtonComponent];

@NgModule({
  declarations: [...CUSTOM_COMPONENT],
  imports: [CommonModule, ...NEBULAR_MODULES],
  exports: [...NEBULAR_MODULES, ...CUSTOM_COMPONENT],
})
export class SharedModule {}
