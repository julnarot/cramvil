import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListContainerComponent } from './check-list-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NbDialogModule,
  NbDialogService,
  NbLayoutModule,
  NbOverlayContainerAdapter,
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
  const dialogServiceSpy = jasmine.createSpyObj('NbDialogService', ['open']);
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
        { provide: NbDialogService, useValue: dialogServiceSpy },
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
    expect(dialogServiceSpy).toBeDefined();
  });

  it('should be open dialog', () => {
    component.lauchFormNew();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(
      CheckListFormNewComponent
    );
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
