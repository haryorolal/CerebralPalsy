import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MANAGEComponent } from './manage.component';

describe('MANAGEComponent', () => {
  let component: MANAGEComponent;
  let fixture: ComponentFixture<MANAGEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MANAGEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MANAGEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
