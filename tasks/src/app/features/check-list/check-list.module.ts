import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListContainerComponent } from './components/check-list-container/check-list-container.component';
import { CheckListItemComponent } from './components/check-list-item/check-list-item.component';
import { CheckListRoutingModule } from './check-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbCheckboxModule, NbInputModule, NbListModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckListContainerComponent, CheckListItemComponent],
  imports: [
    CommonModule,
    CheckListRoutingModule,
    SharedModule,
    NbListModule,
    NbCheckboxModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CheckListContainerComponent],
})
export class CheckListModule {}
