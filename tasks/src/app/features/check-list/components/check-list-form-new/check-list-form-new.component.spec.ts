import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListFormNewComponent } from './check-list-form-new.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbDialogRef } from '@nebular/theme';
import { TaskFacade } from 'src/app/core/facades/task-facade';
import { of } from 'rxjs';
import { Task } from 'src/app/core/models/task';

describe('CheckListFormNewComponent', () => {
  let component: CheckListFormNewComponent;
  let fixture: ComponentFixture<CheckListFormNewComponent>;

  let facade: TaskFacade;
  const dialr = jasmine.createSpyObj('dialgoRef', { close: (d: any) => {} });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckListFormNewComponent],
      imports: [HttpClientTestingModule],
      providers: [TaskFacade, { provide: NbDialogRef, useValue: dialr }],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckListFormNewComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(TaskFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set valid value', () => {
    const formControl = component.taskNameFmCtrl;
    formControl.setValue('');
    expect(formControl.valid).toBeFalsy();
    formControl.setValue('new task');
    expect(formControl.valid).toBeTruthy();
    formControl.setValue([...[...Array(71)].map((_) => 'a')].join(''));
    expect(formControl.invalid).toBeTruthy();
  });

  it('should be can save', () => {
    const formControl = component.taskNameFmCtrl;
    formControl.setValue('New task');
    spyOn(facade, 'saveNewTask').and.returnValue(of(new Task()));
    expect(formControl.valid).toBeTruthy();
    component.onSaveNewTask();
    fixture.detectChanges();
    expect(dialr.close).toHaveBeenCalled();
  });
});
