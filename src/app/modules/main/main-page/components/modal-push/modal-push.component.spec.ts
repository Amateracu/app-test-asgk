import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPushComponent } from './modal-push.component';

describe('ModalPushComponent', () => {
  let component: ModalPushComponent;
  let fixture: ComponentFixture<ModalPushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPushComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
