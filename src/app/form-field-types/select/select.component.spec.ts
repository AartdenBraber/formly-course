import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormlyComponent } from './select.component';

describe('SelectFormlyComponent', () => {
  let component: SelectFormlyComponent;
  let fixture: ComponentFixture<SelectFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFormlyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
