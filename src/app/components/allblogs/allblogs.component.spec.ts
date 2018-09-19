import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllblogsComponent } from './allblogs.component';

describe('AllblogsComponent', () => {
  let component: AllblogsComponent;
  let fixture: ComponentFixture<AllblogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllblogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
