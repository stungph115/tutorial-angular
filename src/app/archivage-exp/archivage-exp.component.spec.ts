import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivageExpComponent } from './archivage-exp.component';

describe('ArchivageExpComponent', () => {
  let component: ArchivageExpComponent;
  let fixture: ComponentFixture<ArchivageExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivageExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivageExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
