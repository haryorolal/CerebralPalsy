import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PATIENTComponent } from './patient.component';

describe('PATIENTComponent', () => {
  let component: PATIENTComponent;
  let fixture: ComponentFixture<PATIENTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PATIENTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PATIENTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
