import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCTComponent } from './pedidos-ct.component';

describe('PedidosCTComponent', () => {
  let component: PedidosCTComponent;
  let fixture: ComponentFixture<PedidosCTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosCTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosCTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
