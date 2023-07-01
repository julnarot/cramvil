import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-check-list-item',
  templateUrl: './check-list-item.component.html',
  styleUrls: ['./check-list-item.component.scss'],
})
export class CheckListItemComponent {
  @Input() task!: Task;
  @Output() removeTaskClicked = new EventEmitter<Task>();
}
