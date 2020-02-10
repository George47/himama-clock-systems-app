import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimingsComponent } from './view-timings.component';

describe('ViewReportsComponent', () => {
  let component: ViewTimingsComponent;
  let fixture: ComponentFixture<ViewTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
