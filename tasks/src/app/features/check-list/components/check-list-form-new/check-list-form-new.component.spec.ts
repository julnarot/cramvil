import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListFormNewComponent } from './check-list-form-new.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbDialogRef } from '@nebular/theme';
describe('CheckListFormNewComponent', () => {
  let component: CheckListFormNewComponent;
  let fixture: ComponentFixture<CheckListFormNewComponent>;
  let nbDialogRef = jasmine.createSpyObj('NbDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckListFormNewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: NbDialogRef,
          useValue: nbDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckListFormNewComponent);
    component = fixture.componentInstance;
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
    expect(formControl.valid).toBeTruthy();
    component.onSaveNewTask();
    expect(nbDialogRef).toBeDefined();
    setTimeout(() => {
      expect(nbDialogRef.close()).toHaveBeenCalled();
    }, 10);
  });
});
