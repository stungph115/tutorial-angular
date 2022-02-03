import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughtnutComponent } from './doughtnut.component';

describe('DoughtnutComponent', () => {
  let component: DoughtnutComponent;
  let fixture: ComponentFixture<DoughtnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughtnutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughtnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
