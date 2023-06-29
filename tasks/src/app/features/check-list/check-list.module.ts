import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListContainerComponent } from './components/check-list-container/check-list-container.component';
import { CheckListItemComponent } from './components/check-list-item/check-list-item.component';
import { CheckListRoutingModule } from './check-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  NbBadgeModule,
  NbCheckboxModule,
  NbInputModule,
  NbListModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckListFormNewComponent } from './components/check-list-form-new/check-list-form-new.component';
import { InputDirectivesModule } from 'src/app/shared/directives/input-directives/input-directives.module';

@NgModule({
  declarations: [
    CheckListContainerComponent,
    CheckListItemComponent,
    CheckListFormNewComponent,
  ],
  imports: [
    CommonModule,
    CheckListRoutingModule,
    SharedModule,
    NbListModule,
    NbCheckboxModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbBadgeModule,
    InputDirectivesModule,
  ],
  exports: [CheckListContainerComponent],
})
export class CheckListModule {}
