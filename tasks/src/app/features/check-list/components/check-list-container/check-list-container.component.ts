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
export class CheckListContainerComponent {
  tasks$: Observable<Task[]> = this.taskFacades.tasks$.pipe(startWith([]));
  isAdding$: Observable<boolean> = this.taskFacades
    .isAddingNewTask$()
    .pipe(startWith(false));
  constructor(private readonly taskFacades: TaskFacade) {}

  onAdding() {
    this.taskFacades.addingNewTask();
  }
}
