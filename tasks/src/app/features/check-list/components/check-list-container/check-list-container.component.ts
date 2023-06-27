import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-check-list-container',
  templateUrl: './check-list-container.component.html',
  styleUrls: ['./check-list-container.component.scss'],
})
export class CheckListContainerComponent implements OnInit {
  tasks$: Observable<Task[]> = of([
    {
      id: '1',
      name: 'task 1',
      status: true,
    } as Task,
  ]);
  constructor() {}

  ngOnInit(): void {}
}
