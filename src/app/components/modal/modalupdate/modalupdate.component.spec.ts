import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateComponent } from './modalupdate.component';

describe('ModalupdateComponent', () => {
  let component: ModalupdateComponent;
  let fixture: ComponentFixture<ModalupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
