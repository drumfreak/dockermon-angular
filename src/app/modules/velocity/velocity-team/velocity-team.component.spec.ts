/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VelocityTeamComponent } from './velocity-team.component';

describe('VelocityTeamComponent', () => {
  let component: VelocityTeamComponent;
  let fixture: ComponentFixture<VelocityTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VelocityTeamComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
