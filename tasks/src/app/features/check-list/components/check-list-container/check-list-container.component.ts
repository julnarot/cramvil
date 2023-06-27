import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, startWith } from 'rxjs';
import { TaskFacade } from 'src/app/core/facades/task-facade';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-check-list-container',
  templateUrl: './check-list-container.component.html',
  styleUrls: ['./check-list-container.component.scss'],
})
export class CheckListContainerComponent implements OnInit {
  tasks$: Observable<Task[]> = this.taskFacades.tasks$.pipe(startWith([]));
  isAdding$: Observable<boolean> = this.taskFacades
    .isAddingNewTask$()
    .pipe(startWith(false));
  taskNameFmCtrl = new FormControl('', [Validators.required]);
  constructor(private readonly taskFacades: TaskFacade) {}

  ngOnInit(): void {}

  onSaveNewTask() {
    if (this.taskNameFmCtrl.valid && this.taskNameFmCtrl.value) {
      this.taskFacades.saveNewTask(this.taskNameFmCtrl.value).subscribe();
    }
  }
  onAdding() {
    this.taskFacades.addingNewTask();
  }
}
