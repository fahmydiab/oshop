import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNvbarComponent } from './bs-nvbar.component';

describe('BsNvbarComponent', () => {
  let component: BsNvbarComponent;
  let fixture: ComponentFixture<BsNvbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsNvbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
