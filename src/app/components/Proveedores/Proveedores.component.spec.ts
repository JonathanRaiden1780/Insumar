import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresComponent } from './Proveedores.component';

describe('RegisterComponent', () => {
  let component: ProveedoresComponent;
  let fixture: ComponentFixture<ProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
