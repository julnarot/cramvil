import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListContainerComponent } from './check-list-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NB_DOCUMENT,
  NbDialogModule,
  NbDialogService,
  NbLayoutModule,
  NbOverlayContainerAdapter,
  NbOverlayService,
  NbThemeModule,
  NbViewportRulerAdapter,
} from '@nebular/theme';
import { TaskFacade } from 'src/app/core/facades/task-facade';
import { TaskAdapter } from 'src/app/core/adapters/task-adapter';
import { firstTaskResponseSpec } from 'src/app/core/spec-helpers/task-spec-helper';
import { CheckListFormNewComponent } from '../check-list-form-new/check-list-form-new.component';
import { Injectable } from '@angular/core';

@Injectable()
export class NbViewportRulerMockAdapter extends NbViewportRulerAdapter {
  override getViewportSize(): Readonly<{ width: number; height: number }> {
    return { width: 1600, height: 900 };
  }
  override getViewportScrollPosition(): { left: number; top: number } {
    return { left: 0, top: 0 };
  }
}

describe('CheckListContainerComponent', () => {
  let component: CheckListContainerComponent;
  let fixture: ComponentFixture<CheckListContainerComponent>;
  const nbDialogService = jasmine.createSpyObj('nbDialogService', ['open']);
  let facade: TaskFacade;
  let adapter: TaskAdapter;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbDialogModule.forRoot(),
        HttpClientTestingModule,
      ],
      declarations: [CheckListContainerComponent],
      providers: [
        {
          provide: NbViewportRulerAdapter,
          useClass: NbViewportRulerMockAdapter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckListContainerComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(TaskFacade);
    adapter = TestBed.inject(TaskAdapter);

    overlayContainerService = TestBed.inject(NbOverlayContainerAdapter);

    fixture.detectChanges();
  });
  beforeEach(() => {
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);
  });

  afterAll(() => {
    overlayContainerService.clearContainer();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be dialog service defined', () => {
    expect(nbDialogService).toBeDefined();
  });

  it('should be open dialog', () => {
    component.lauchFormNew();
    expect(component.ref.componentRef).toBeTruthy();
    setTimeout(() => {
      expect(
        component.ref.componentRef instanceof CheckListFormNewComponent
      ).toBeTruthy();
    }, 10);
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
