import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailUserComponent } from './edit-detail-user.component';

describe('EditDetailUserComponent', () => {
  let component: EditDetailUserComponent;
  let fixture: ComponentFixture<EditDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
