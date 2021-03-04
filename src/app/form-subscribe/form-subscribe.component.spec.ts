import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscribeComponent } from './form-subscribe.component';

describe('FormSubscribeComponent', () => {
  let component: FormSubscribeComponent;
  let fixture: ComponentFixture<FormSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
