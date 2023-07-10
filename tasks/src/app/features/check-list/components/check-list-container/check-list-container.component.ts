import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable, tap } from 'rxjs';
import { TaskFacade } from 'src/app/core/facades/task-facade';
import { Task } from 'src/app/core/models/task';
import { CheckListFormNewComponent } from '../check-list-form-new/check-list-form-new.component';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-check-list-container',
  templateUrl: './check-list-container.component.html',
  styleUrls: ['./check-list-container.component.scss'],
})
export class CheckListContainerComponent implements OnInit {
  tasksCounter = 0;
  tasks$: Observable<Task[]> = this.taskFacades.tasks$.pipe(
    tap((t) => (this.tasksCounter = t.length))
  );

  constructor(
    private readonly taskFacades: TaskFacade,
    private readonly dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.taskFacades.refleshTasks();
  }

  lauchFormNew() {
    this.dialogService.open(CheckListFormNewComponent);
  }
  onRemoveTask(task: Task) {
    this.taskFacades.removeTask(task);
  }
}
