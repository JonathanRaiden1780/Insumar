import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasCTComponent } from './entradas-ct.component';

describe('EntradasCTComponent', () => {
  let component: EntradasCTComponent;
  let fixture: ComponentFixture<EntradasCTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradasCTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasCTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
