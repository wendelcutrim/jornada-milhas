import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserBaseComponent } from './form-user-base.component';

describe('FormUserBaseComponent', () => {
  let component: FormUserBaseComponent;
  let fixture: ComponentFixture<FormUserBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserBaseComponent]
    });
    fixture = TestBed.createComponent(FormUserBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
