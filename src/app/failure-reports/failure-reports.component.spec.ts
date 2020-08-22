import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureReportsComponent } from './failure-reports.component';

describe('FailureReportsComponent', () => {
  let component: FailureReportsComponent;
  let fixture: ComponentFixture<FailureReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailureReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
