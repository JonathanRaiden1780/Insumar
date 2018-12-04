import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsalidaComponent } from './controlsalida.component';

describe('ControlsalidaComponent', () => {
  let component: ControlsalidaComponent;
  let fixture: ComponentFixture<ControlsalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
