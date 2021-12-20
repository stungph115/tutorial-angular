import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDeleteFileComponent } from './alert-delete-file.component';

describe('AlertDeleteFileComponent', () => {
  let component: AlertDeleteFileComponent;
  let fixture: ComponentFixture<AlertDeleteFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertDeleteFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDeleteFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
