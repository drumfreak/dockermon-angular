/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VelocityChartDonutComponent } from './velocity-chart-donut.component';

describe('VelocityChartDonutComponent', () => {
  let component: VelocityChartDonutComponent;
  let fixture: ComponentFixture<VelocityChartDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VelocityChartDonutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityChartDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
