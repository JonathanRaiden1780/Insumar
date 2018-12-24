import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasCTComponent } from './salidas-ct.component';

describe('SalidasCTComponent', () => {
  let component: SalidasCTComponent;
  let fixture: ComponentFixture<SalidasCTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidasCTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidasCTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
