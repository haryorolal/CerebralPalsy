import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { USERComponent } from './user.component';

describe('USERComponent', () => {
  let component: USERComponent;
  let fixture: ComponentFixture<USERComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USERComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
