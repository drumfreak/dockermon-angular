/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VelocityChartBarComponent } from './velocity-chart-bar.component';

describe('VelocityChartBarComponent', () => {
  let component: VelocityChartBarComponent;
  let fixture: ComponentFixture<VelocityChartBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VelocityChartBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
