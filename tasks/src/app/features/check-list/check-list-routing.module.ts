import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckListContainerComponent } from './components/check-list-container/check-list-container.component';

const routes: Routes = [
  {
    path: '',
    component: CheckListContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckListRoutingModule {}
