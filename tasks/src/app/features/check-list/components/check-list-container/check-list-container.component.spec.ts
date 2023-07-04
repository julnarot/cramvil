import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListContainerComponent } from './check-list-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NbDialogModule,
  NbDialogService,
  NbLayoutModule,
  NbThemeModule,
} from '@nebular/theme';
import { TaskFacade } from 'src/app/core/facades/task-facade';
import { TaskAdapter } from 'src/app/core/adapters/task-adapter';
import { firstTaskResponseSpec } from 'src/app/core/spec-helpers/task-spec-helper';

describe('CheckListContainerComponent', () => {
  let component: CheckListContainerComponent;
  let fixture: ComponentFixture<CheckListContainerComponent>;
  let nbDialogSErvice = jasmine.createSpyObj('nbDialogSErvice', ['close']);
  let facade: TaskFacade;
  let adapter: TaskAdapter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbDialogModule.forRoot(),
        HttpClientTestingModule,
      ],
      declarations: [CheckListContainerComponent],
      providers: [NbDialogService],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckListContainerComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(TaskFacade);
    adapter = TestBed.inject(TaskAdapter);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be dialog service defined', () => {
    expect(nbDialogSErvice).toBeDefined();
  });
  it('should be remove task from list', () => {
    const task = adapter.adapt(firstTaskResponseSpec);
    facade.addNewTaskAction(task);
    component.onRemoveTask(task);
    facade.tasks$.subscribe((t) => {
      expect(t.length).toEqual(0);
    });
  });
});
