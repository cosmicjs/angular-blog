import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepostComponent } from './singlepost.component';

describe('SinglepostComponent', () => {
  let component: SinglepostComponent;
  let fixture: ComponentFixture<SinglepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
