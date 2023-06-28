import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskFacade } from 'src/app/core/facades/task-facade';

@Component({
  selector: 'app-check-list-form-new',
  templateUrl: './check-list-form-new.component.html',
  styleUrls: ['./check-list-form-new.component.scss']
})
export class CheckListFormNewComponent {
  taskNameFmCtrl = new FormControl('', [Validators.required]);
  constructor(private readonly taskFacades: TaskFacade) {}
  onSaveNewTask() {
    if (this.taskNameFmCtrl.valid && this.taskNameFmCtrl.value) {
      this.taskFacades.saveNewTask(this.taskNameFmCtrl.value).subscribe();
    }
  }
}
