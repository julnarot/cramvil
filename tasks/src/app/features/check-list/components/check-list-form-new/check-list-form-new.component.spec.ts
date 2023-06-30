import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListFormNewComponent } from './check-list-form-new.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('CheckListFormNewComponent', () => {
  let component: CheckListFormNewComponent;
  let fixture: ComponentFixture<CheckListFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckListFormNewComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckListFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
