import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaReportsComponent } from './qa-reports.component';

describe('QaReportsComponent', () => {
  let component: QaReportsComponent;
  let fixture: ComponentFixture<QaReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
