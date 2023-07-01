import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { TaskFacade } from 'src/app/core/facades/task-facade';

@Component({
  selector: 'app-check-list-form-new',
  templateUrl: './check-list-form-new.component.html',
  styleUrls: ['./check-list-form-new.component.scss'],
})
export class CheckListFormNewComponent {
  maxLen = 70;
  minLen = 4;
  charsAvailable = 0;
  taskNameFmCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLen),
    Validators.maxLength(this.maxLen),
  ]);
  constructor(
    private readonly taskFacades: TaskFacade,
    private readonly dialgoRef: NbDialogRef<CheckListFormNewComponent>
  ) {
    this.taskNameFmCtrl.valueChanges.subscribe((s) => {
      if (s && typeof s === 'string') {
        this.charsAvailable = s.length;
      }
    });
  }
  onSaveNewTask() {
    if (this.taskNameFmCtrl.valid && this.taskNameFmCtrl.value !== null) {
      this.taskFacades
        .saveNewTask(this.taskNameFmCtrl.value)
        .subscribe((taskSaved) => this.dialgoRef.close(taskSaved));
    }
  }

}
