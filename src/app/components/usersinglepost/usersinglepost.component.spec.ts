import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersinglepostComponent } from './usersinglepost.component';

describe('UsersinglepostComponent', () => {
  let component: UsersinglepostComponent;
  let fixture: ComponentFixture<UsersinglepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersinglepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersinglepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
