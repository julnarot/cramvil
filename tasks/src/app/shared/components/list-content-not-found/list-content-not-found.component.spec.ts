import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContentNotFoundComponent } from './list-content-not-found.component';

describe('ListContentNotFoundComponent', () => {
  let component: ListContentNotFoundComponent;
  let fixture: ComponentFixture<ListContentNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContentNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContentNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
