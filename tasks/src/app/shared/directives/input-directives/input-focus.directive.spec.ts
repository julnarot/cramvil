import { Component, DebugElement } from '@angular/core';
import { InputFocusDirective } from './input-focus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <input type="text" appInputFocus /> `,
})
class InputComponentTest {}

describe('InputFocusDirective', () => {
  let fixture: ComponentFixture<InputComponentTest>;
  let elements: DebugElement[];
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ InputComponentTest, InputFocusDirective ],
    })
    .createComponent(InputComponentTest);
    fixture.detectChanges();
    elements = fixture.debugElement.queryAll(By.directive(InputFocusDirective));
  });

  it('should create single component with one directive', () => {
    expect(elements.length).toBe(1);
  });
});
