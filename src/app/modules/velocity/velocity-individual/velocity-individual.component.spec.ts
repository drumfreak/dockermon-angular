/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VelocityIndividualComponent } from './velocity-individual.component';

describe('VelocityIndividualComponent', () => {
  let component: VelocityIndividualComponent;
  let fixture: ComponentFixture<VelocityIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VelocityIndividualComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
