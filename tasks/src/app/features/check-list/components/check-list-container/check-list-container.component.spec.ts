import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListContainerComponent } from './check-list-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbDialogModule, NbDialogService, NbLayoutModule, NbThemeModule } from '@nebular/theme';

describe('CheckListContainerComponent', () => {
  let component: CheckListContainerComponent;
  let fixture: ComponentFixture<CheckListContainerComponent>;
  let nbDialogSErvice = jasmine.createSpyObj('nbDialogSErvice', ['close']);

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be dialog service defined', () => {
    expect(nbDialogSErvice).toBeDefined();
  });


});
