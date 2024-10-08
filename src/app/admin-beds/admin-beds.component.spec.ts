import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBedsComponent } from './admin-beds.component';

describe('AdminBedsComponent', () => {
  let component: AdminBedsComponent;
  let fixture: ComponentFixture<AdminBedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
